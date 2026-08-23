/**
 * Turns narration/*.md into one avatar clip per slide plus a cue manifest the
 * deck's auto-mode plays against.
 *
 * The pipeline is two HeyGen calls per slide, in this order for a reason:
 *
 *   1. POST /v3/voices/speech  — synthesises the prose and returns
 *      `word_timestamps`, which is the only thing in either API that can tell
 *      us *when* a given phrase is spoken. That is what resolves a `[click]`
 *      marker into a time.
 *   2. POST /v3/videos — drives the avatar from that exact audio (`audio_url`)
 *      rather than from a script. Same audio, so the timestamps measured in
 *      step 1 stay valid against the rendered video frame-for-frame.
 *      Generating from text instead would re-synthesise the speech and
 *      silently invalidate every cue.
 *
 * Every endpoint here is v3. The v1/v2 equivalents still answer but each
 * returns a `warning` naming a 2026-10-31 sunset: /v2/avatars and
 * /v2/avatar/{id}/details, /v2/video/generate, /v1/video_status.get and
 * /v2/user/remaining_quota.
 *
 * One clip per slide, not one per click step. The deck has 59 slides but ~171
 * click steps; per-step clips would mean 171 avatar entrances and exits, and a
 * hard cut mid-sentence every time a bullet appears. A slide is the natural
 * unit of speech, and the cues ride inside it.
 *
 * Costed and cached: the manifest doubles as the cache, keyed on a hash of the
 * prose and the voice/avatar settings, so a re-run after fixing one typo
 * regenerates one slide.
 *
 * Usage:
 *   HEYGEN_API_KEY=... HEYGEN_VOICE_ID=... HEYGEN_AVATAR_ID=... \
 *     yarn narration:build [--audio-only] [--dry-run] [--only=NN-slug] [--force] [--restamp=4-10]
 *
 * --dry-run stops after the TTS step: it prints the resolved cue times and the
 * total spoken duration without spending any video credits. Run it first.
 *
 * --audio-only skips step 2 and ships the synthesised speech with a still of
 * the avatar. Every other part of auto-mode is unchanged — same voice, same
 * word-timed cues, same auto-advance — so it is the honest way to rehearse the
 * timing before committing to the render. Video is ~99% of the cost: a 2.7s
 * smoke clip measured 4 credits end to end, nearly all of it step 2.
 *
 * --restamp=4-10 re-keys those slides' manifest entries to the current hash
 * without rendering, provided their asset is on disk and matches the build
 * mode. For when a *parameter* entered the hash string after a clip was
 * rendered (as `resolution` did for slides 4–10) and the clip on disk is still
 * the right one. It is an assertion, not a check — the script cannot tell a
 * changed parameter from changed prose — so it takes an explicit slide list
 * and never applies itself.
 */
import { mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { CUE_LEAD_SECONDS, ROOT, buildCaptions, buildIndex, loadDeck, resolveCues } from './narration-lib.mjs'

const API = 'https://api.heygen.com'
const OUT_DIR = join(ROOT, 'public', 'narration')
const MANIFEST = join(OUT_DIR, 'manifest.json')

const args = process.argv.slice(2)
const flag = name => args.includes(`--${name}`)
const option = name => args.find(a => a.startsWith(`--${name}=`))?.split('=')[1]

const dryRun = flag('dry-run')
const force = flag('force')
const only = option('only')
const restamp = parseSlideList(option('restamp'))

/** "4-10,12" -> Set {4,...,10,12} */
function parseSlideList(spec) {
  const slides = new Set()
  for (const part of spec?.split(',').filter(Boolean) ?? []) {
    const [from, to = from] = part.split('-').map(Number)
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from) {
      fail(`--restamp: "${part}" is not a slide number or range`)
    }
    for (let n = from; n <= to; n++) slides.add(n)
  }
  return slides
}

/**
 * `audio` builds the whole experience — real voice, real word-timed cues, real
 * auto-advance — with a still of the avatar instead of a rendered clip. Video
 * is ~99% of the credit cost, so this is the mode to rehearse and revise in;
 * switch to `video` once the prose has stopped changing.
 */
const mode = flag('audio-only') ? 'audio' : 'video'

const { HEYGEN_API_KEY, HEYGEN_VOICE_ID, HEYGEN_AVATAR_ID } = process.env
/**
 * Which avatar model renders the clip. `/v3/videos` defaults to `avatar_iv`
 * when the field is omitted, and Avatar IV is billed at $4/min against Avatar
 * III's $1/min (HeyGen API pricing). Measured: four Avatar IV clips, 3.3 min,
 * $13.47. The v2 endpoint this replaced rendered Avatar III, which is why the
 * early clips were cheap. Avatar III resolves to Digital Twin for this look
 * (`supported_api_engines` on the look record confirms it), which is the same
 * class of render the approved clips came from.
 */
const HEYGEN_ENGINE = process.env.HEYGEN_ENGINE ?? 'avatar_iii'
if (!HEYGEN_API_KEY) fail('HEYGEN_API_KEY is not set')
if (!HEYGEN_VOICE_ID) fail('HEYGEN_VOICE_ID is not set — list options with GET /v3/voices?engine=starfish')
if (!HEYGEN_AVATAR_ID && !dryRun) fail('HEYGEN_AVATAR_ID is not set')

function fail(message) {
  console.error(`narration-build: ${message}`)
  process.exit(1)
}

async function heygen(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      'X-Api-Key': HEYGEN_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body && JSON.stringify(body),
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok || payload?.error) {
    throw new Error(`${method} ${path} -> ${response.status} ${JSON.stringify(payload?.error ?? payload)}`)
  }
  return payload.data ?? payload
}

async function synthesise(text) {
  const data = await heygen('/v3/voices/speech', {
    method: 'POST',
    body: { text, voice_id: HEYGEN_VOICE_ID, locale: 'en-US' },
  })
  return { audioUrl: data.audio_url, duration: data.duration, words: data.word_timestamps }
}

/**
 * Nearest standard rung at or below the avatar's own frame height. Asking for
 * more than the source has is pure upscale: measured on this avatar (native
 * 1280x720), `1080p` produced 752 KB/s against 720p's 164 KB/s — 4.6x the bytes
 * for a picture the deck displays in a 220px tile. Over a full deck that is
 * ~1.35 GB instead of ~295 MB, all of it fetched at play time.
 */
function resolutionFor(height) {
  if (!height) return '720p'
  return [['2160p', 2160], ['1440p', 1440], ['1080p', 1080], ['720p', 720], ['480p', 480]].find(
    ([, h]) => height >= h,
  )?.[0] ?? '480p'
}

async function renderAvatar(audioUrl, resolution) {
  // The POST answers with `video_id`; the GET below answers with `id`. They are
  // genuinely different field names for the same thing, so read each from its
  // own response rather than assuming one shape across the pair.
  const created = await heygen('/v3/videos', {
    method: 'POST',
    body: {
      type: 'avatar',
      avatar_id: HEYGEN_AVATAR_ID,
      // The audio from step 1, not a script: re-synthesising here would produce
      // different timings and orphan every cue.
      audio_url: audioUrl,
      // "auto" means the avatar's native framing, which is the whole fix for
      // the letterbox: asking for a square put white bars in the pixels, with
      // the head in the middle ~57% of the frame (measured on a 720x720 smoke
      // render). The corner tile crops this to the face with object-fit: cover.
      aspect_ratio: 'auto',
      resolution,
      engine: HEYGEN_ENGINE,
    },
  })

  const videoId = created.video_id ?? created.id
  // Fail here rather than polling /v3/videos/undefined: the render has already
  // been queued and billed at this point, so losing its id costs real money and
  // the 404 that follows names the wrong problem.
  if (!videoId) throw new Error(`POST /v3/videos returned no video id: ${JSON.stringify(created)}`)

  // Rendering is queued server-side; a 59-slide deck is well over an hour of
  // polling in total, so this is a background job, not something to run while
  // waiting to walk on stage.
  for (let attempt = 0; attempt < 240; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 5000))
    const status = await heygen(`/v3/videos/${videoId}`)
    if (status.status === 'completed') return { url: status.video_url ?? status.url, videoId }
    if (status.status === 'failed') throw new Error(`render failed: ${JSON.stringify(status.error ?? status)}`)
  }
  throw new Error(`render timed out for ${videoId}`)
}

async function download(url, path) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`download ${url} -> ${response.status}`)
  await writeFile(path, Buffer.from(await response.arrayBuffer()))
}

/**
 * The avatar's own record: the still for --audio-only mode, and the native
 * frame size the clips are rendered at.
 *
 * `/v3/avatars/looks/{look_id}` rather than the `/v3/avatars/{group_id}/looks/
 * {look_id}` in the docs — the documented path 404s, and it would need a group
 * id we don't have. `/v3/avatars` itself lists groups, never looks, so the id
 * used for generation is not in it.
 */
async function fetchAvatar() {
  const look = await heygen(`/v3/avatars/looks/${HEYGEN_AVATAR_ID}`)
  let image = null
  if (look.preview_image_url) {
    // Keep the served extension. HeyGen returns .webp here, and naming it .jpg
    // would be a lie the browser forgives and the next reader doesn't.
    const extension = new URL(look.preview_image_url).pathname.match(/\.[a-z0-9]+$/i)?.[0] ?? '.jpg'
    const file = `avatar-still${extension}`
    await download(look.preview_image_url, join(OUT_DIR, file))
    image = `/narration/${file}`
  }
  return { image, name: look.name ?? null, width: look.image_width, height: look.image_height }
}

/**
 * Whether the asset a manifest entry names is actually on disk.
 *
 * The manifest is tracked and the clips it points at are gitignored, so a fresh
 * clone starts life with a complete cache referencing nothing. A hash match
 * alone would report every slide reused, spend nothing, and republish a
 * manifest of 404s — auto-mode silently broken rather than loudly unbuilt, and
 * the failure only shows when someone presses Start.
 */
async function hasAsset(entry) {
  const asset = entry?.video ?? entry?.audio
  if (!asset) return false
  return stat(join(OUT_DIR, asset.split('/').pop())).then(
    () => true,
    () => false,
  )
}

const data = await loadDeck()
const { entries, problems } = await buildIndex(data)

if (problems.length) {
  for (const problem of problems) console.error(`! ${problem}`)
  fail('narration is out of sync with the deck')
}

await mkdir(OUT_DIR, { recursive: true })
const previous = JSON.parse(await readFile(MANIFEST, 'utf-8').catch(() => '{"slides":{}}'))

const avatar = dryRun ? null : await fetchAvatar()
const resolution = resolutionFor(avatar?.height)

const manifest = {
  voice: HEYGEN_VOICE_ID,
  avatar: HEYGEN_AVATAR_ID ?? null,
  avatarName: avatar?.name ?? null,
  // Always present, even for a video build: it covers the moment before a clip
  // has buffered, and any slide whose narration was built in the other mode.
  still: avatar?.image ?? null,
  slides: {},
}

const withNarrationMetadata = (built, entry, words = null) => ({
  ...built,
  transcript: entry.text,
  captions: buildCaptions(entry.text, words, built.duration),
})
let spent = 0
let reused = 0
let recovered = 0
let restamped = 0
const absent = []

/**
 * A failed render mid-run must not lose the renders before it. The manifest is
 * written once at the end, so an exception (a 402 when the balance runs out is
 * the likely one) used to exit with the new clips on disk but no entries for
 * them — their videoIds gone, and the next build paying to render them again.
 * On failure the untouched slides are carried over from the previous manifest
 * and the partial result is saved before the error propagates.
 */
async function saveProgress(error, done) {
  for (const entry of entries) {
    if (manifest.slides[entry.no] || !previous.slides?.[entry.no]) continue
    manifest.slides[entry.no] = withNarrationMetadata(previous.slides[entry.no], entry)
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.error(`\nnarration-build: stopped after slide ${done} — ${error.message}`)
  console.error(`manifest saved with the ${spent ? 'new' : 'previous'} entries; re-run to continue`)
  process.exit(1)
}

let lastDone = 0
for (const entry of entries) {
  try {
    await buildSlide(entry)
  } catch (error) {
    if (dryRun) throw error
    await saveProgress(error, lastDone)
  }
  lastDone = entry.no
}

async function buildSlide(entry) {
  if (only && entry.file !== only) {
    // Carry the untouched slides through, or a filtered run would publish a
    // manifest containing only the section it rebuilt.
    const kept = previous.slides?.[entry.no]
    if (kept) {
      manifest.slides[entry.no] = withNarrationMetadata(kept, entry)
      // Rebuilding these would defeat --only, so say so instead of fixing it.
      if (!dryRun && !(await hasAsset(kept))) absent.push(entry.no)
    }
    return
  }

  // `mode` is in the hash so switching between audio and video rebuilds a
  // slide instead of serving the other mode's cached asset.
  // The engine only shapes the picture, so it keys video entries alone — an
  // engine change must not re-synthesise 49 slides of unchanged speech.
  const hashFor = m =>
    createHash('sha256')
      .update(`${m} ${resolution} ${m === 'video' ? `${HEYGEN_ENGINE} ` : ''}${entry.text} ${HEYGEN_VOICE_ID} ${HEYGEN_AVATAR_ID} ${CUE_LEAD_SECONDS}`)
      .digest('hex')
      .slice(0, 12)
  const hash = hashFor(mode)

  const cached = previous.slides?.[entry.no]

  // An audio pass never downgrades a rendered clip whose prose is current: the
  // clip is the better asset, and replacing its entry would orphan the mp4 so
  // pruneOrphans deleted an approved take. Once the prose moves, the video
  // hash stops matching and the slide re-synthesises like any other.
  if (mode === 'audio' && !force && cached?.video && cached.hash === hashFor('video') && !dryRun) {
    if (await hasAsset(cached)) {
      manifest.slides[entry.no] = withNarrationMetadata(cached, entry)
      reused++
      return
    }
  }

  if (restamp.has(entry.no) && !dryRun) {
    // Re-key the entry for whatever it already is — a video entry to the video
    // hash, an audio entry to the audio hash — regardless of the build mode.
    if (!cached || !(await hasAsset(cached))) {
      fail(`--restamp: slide ${entry.no} has no asset on disk to restamp`)
    }
    const kept = hashFor(cached.video ? 'video' : 'audio')
    manifest.slides[entry.no] = withNarrationMetadata({ ...cached, hash: kept }, entry)
    restamped++
    console.log(`  ${String(entry.no).padStart(2)} restamped ${cached.hash} -> ${kept} (no render)`)
    return
  }

  if (!force && cached?.hash === hash && !dryRun) {
    if (await hasAsset(cached)) {
      manifest.slides[entry.no] = withNarrationMetadata(cached, entry)
      reused++
      return
    }
    // The prose is unchanged and the render still exists in the account — only
    // the local file is missing. Fetch it back rather than paying to render the
    // same words into a different take. Audio entries have no equivalent: a TTS
    // result isn't listed anywhere, so those fall through and re-synthesise.
    if (cached.videoId) {
      const detail = await heygen(`/v3/videos/${cached.videoId}`)
      await download(detail.video_url ?? detail.url, join(OUT_DIR, cached.video.split('/').pop()))
      manifest.slides[entry.no] = withNarrationMetadata(cached, entry)
      recovered++
      console.log(`  ${String(entry.no).padStart(2)} recovered ${cached.video.split('/').pop()} (no render)`)
      return
    }
  }

  const label = `${String(entry.no).padStart(2)} ${entry.title || entry.layout}`

  // A dry run exists to show cue times without spending; for a slide whose
  // speech is already built in either mode, the times are in the manifest.
  // Re-synthesising them cost $1.08 across 49 cached slides once — TTS is
  // cheap per minute, not free per run.
  if (dryRun && cached && cached.hash === hashFor(cached.video ? 'video' : 'audio')) {
    console.log(`  ${label}  ${cached.duration.toFixed(1)}s  cues [${cached.cues.map(c => c.toFixed(1)).join(', ')}]  (cached)`)
    return
  }

  const { audioUrl, duration, words } = await synthesise(entry.text)
  const { cues, estimated } = resolveCues(entry.segments, words, duration)
  spent += duration

  if (estimated && entry.segments.length > 1) {
    console.warn(`  ${label}: word timings didn't line up, cues spaced evenly — check this slide`)
  }

  if (dryRun) {
    console.log(`  ${label}  ${duration.toFixed(1)}s  cues [${cues.map(c => c.toFixed(1)).join(', ')}]`)
    return
  }

  const stem = `slide-${String(entry.no).padStart(2, '0')}-${hash}`

  if (mode === 'audio') {
    // The synthesised audio is downloaded rather than linked: HeyGen's
    // audio_url is a temporary resource, and a deck that stops narrating a
    // week later because a URL expired is the wrong kind of surprise.
    const file = `${stem}.mp3`
    await download(audioUrl, join(OUT_DIR, file))
    manifest.slides[entry.no] = withNarrationMetadata(
      { hash, audio: `/narration/${file}`, duration, cues },
      entry,
      words,
    )
    console.log(`  ${label}  ${duration.toFixed(1)}s  ${cues.length} cues  -> ${file}`)
    return
  }

  const file = `${stem}.mp4`
  const { url, videoId } = await renderAvatar(audioUrl, resolution)
  await download(url, join(OUT_DIR, file))
  // videoId is recorded so a lost local clip is a download rather than a
  // re-render: the account keeps the rendered video, and paying to render the
  // same prose again would also produce a *different take* — same words, new
  // head movement — silently replacing one you had already approved.
  manifest.slides[entry.no] = withNarrationMetadata(
    { hash, videoId, video: `/narration/${file}`, duration, cues },
    entry,
    words,
  )
  console.log(`  ${label}  ${duration.toFixed(1)}s  ${cues.length} cues  -> ${file}`)
}

if (!dryRun) await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

/**
 * Assets are content-hashed, so every prose edit and every mode switch leaves
 * the previous file behind. Nothing reads them again — the manifest only ever
 * points at current hashes — but they are shipped: `public/` is copied wholesale
 * into `dist/`, so stale clips would bloat the build without ever being played.
 *
 * Safe to run after a filtered `--only` pass: untouched slides are carried into
 * the manifest from the previous one, so the keep-set is always the whole deck.
 */
async function pruneOrphans() {
  const keep = new Set(['manifest.json'])
  if (manifest.still) keep.add(manifest.still.split('/').pop())
  for (const slide of Object.values(manifest.slides)) {
    for (const asset of [slide.video, slide.audio]) if (asset) keep.add(asset.split('/').pop())
  }

  // The mascot renderer's output (scripts/narration-mascot.mjs) lives in the
  // same directory and is pruned by that script, not this one.
  const isMascot = file => /-mascot-[0-9a-f]{12}\.mp4$/.test(file) || file === 'mascot.json' || file === 'mascot-still.png'
  const orphans = (await readdir(OUT_DIR)).filter(file => !keep.has(file) && !isMascot(file))
  let freed = 0
  for (const file of orphans) {
    const path = join(OUT_DIR, file)
    freed += (await stat(path)).size
    await unlink(path)
  }
  return { count: orphans.length, mb: freed / 1024 / 1024 }
}

const pruned = dryRun ? null : await pruneOrphans()

console.log(
  `\n${dryRun ? 'Dry run. ' : ''}${entries.length} narrated slides, ` +
    `${reused} reused, ${recovered ? `${recovered} re-downloaded, ` : ''}` +
    `${restamped ? `${restamped} restamped, ` : ''}` +
    `${(spent / 60).toFixed(1)} min of new speech.` +
    (pruned?.count ? ` Pruned ${pruned.count} orphaned asset(s), ${pruned.mb.toFixed(1)} MB.` : ''),
)

if (absent.length) {
  console.warn(
    `! ${absent.length} slide(s) outside --only=${only} name an asset that is not on disk ` +
      `(slide ${absent.join(', ')}). Auto-mode will 404 on them until you re-run without --only.`,
  )
}
