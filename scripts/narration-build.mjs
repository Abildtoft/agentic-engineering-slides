/**
 * Turns narration/*.md into one speech clip per slide plus a cue manifest the
 * deck's auto-mode plays against.
 *
 * Speech is ElevenLabs (`eleven_v3` by default), one call per slide:
 *
 *   POST /v1/text-to-speech/{voice_id}/with-timestamps
 *
 * The response carries the audio and a character-level `alignment` over the
 * *original* text. Grouping those characters into whitespace-separated runs
 * yields word timings whose tokenisation matches the written prose exactly —
 * which is what resolves a `[click]` marker into a time. There are no
 * normalisation surprises: the alignment covers the text as written, so
 * numerals and abbreviations count as one token each, always.
 *
 * Pace is baked into the audio, not the player. `NARRATION_PACE` (default 1.1)
 * runs the downloaded clip through ffmpeg's `atempo` — pitch-preserving, and
 * exact: time t in the original maps to t/pace, so every word timing and cue
 * is scaled by the same factor. This is deliberately not `voice_settings.speed`,
 * which eleven_v3 does not reliably honour; a local time-stretch works for any
 * model and keeps the timestamps provably in sync with the audio.
 *
 * One clip per slide, not one per click step. The deck has 63 slides with 128
 * narration cue markers; per-cue clips would mean a hard cut mid-sentence
 * every time a bullet appears. A slide is the natural unit of speech, and the
 * cues ride inside it.
 *
 * Costed and cached: the manifest doubles as the cache, keyed on a hash of the
 * prose and the voice/model/pace settings, so a re-run after fixing one typo
 * regenerates one slide. Synthesis is billed per character, so the hash is
 * what stands between a typo fix and paying for the whole deck again.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=... yarn narration:audio \
 *     [--dry-run] [--only=NN-slug] [--slides=32,39,44] [--force] [--restamp=4-10]
 *
 * --dry-run stops after synthesis: it prints the resolved cue times and the
 * total spoken duration without writing any files. Cached slides are reported
 * from the manifest without re-synthesising (characters cost money every time).
 *
 * --restamp=4-10 re-keys those slides' manifest entries to the current hash
 * without synthesising, provided their asset is on disk. For when a
 * *parameter* entered the hash string after a clip was built and the clip on
 * disk is still the right one. It is an assertion, not a check — the script
 * cannot tell a changed parameter from changed prose — so it takes an explicit
 * slide list and never applies itself.
 */
import { mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join } from 'node:path'
import {
  CUE_LEAD_SECONDS,
  ROOT,
  buildCaptions,
  buildIndex,
  loadDeck,
  resolveCues,
  scaleWordTimes,
  wordsFromAlignment,
} from './narration-lib.mjs'

const run = promisify(execFile)

const API = 'https://api.elevenlabs.io'
const OUT_DIR = join(ROOT, 'public', 'narration')
const MANIFEST = join(OUT_DIR, 'manifest.json')

const args = process.argv.slice(2)
const flag = name => args.includes(`--${name}`)
const option = name => args.find(a => a.startsWith(`--${name}=`))?.split('=')[1]

const dryRun = flag('dry-run')
const force = flag('force')
const only = option('only')
const slides = parseSlideList(option('slides'))
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

const { ELEVENLABS_API_KEY } = process.env
/** "Eric — Smooth, Trustworthy": ElevenLabs' premade friendly, conversational
    middle-aged American male. Verified against the account by
    `yarn narration:voices` before any characters are spent. */
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'cjVigY5qzO86Huf0OWal'
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_v3'
/** eleven_v3 reads stability as three modes, not a slider: 0.0 Creative
    (most expressive, occasionally off-script), 0.5 Natural, 1.0 Robust. */
const STABILITY = Number(process.env.ELEVENLABS_STABILITY ?? 0.5)
/** Baked into the audio via atempo; every timestamp is divided by this. */
const PACE = Number(process.env.NARRATION_PACE ?? 1.1)
/** Best-effort determinism: a re-synthesised slide (a lost mp3, a --force run
    with unchanged prose) comes back as close to the same take as the model
    allows, instead of a fresh performance nobody reviewed. */
const SEED = 42

if (!ELEVENLABS_API_KEY) fail('ELEVENLABS_API_KEY is not set — add it to .env (see .env.example)')
if (!Number.isFinite(PACE) || PACE < 0.5 || PACE > 2) {
  fail(`NARRATION_PACE=${process.env.NARRATION_PACE} — must be a number between 0.5 and 2 (ffmpeg atempo's single-filter range)`)
}
if (MODEL_ID.startsWith('eleven_v3') && ![0, 0.5, 1].includes(STABILITY)) {
  fail(`ELEVENLABS_STABILITY=${STABILITY} — eleven_v3 accepts only 0.0 (Creative), 0.5 (Natural) or 1.0 (Robust)`)
}

function fail(message) {
  console.error(`narration-build: ${message}`)
  process.exit(1)
}

async function elevenlabs(path, body) {
  const response = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(`POST ${path} -> ${response.status} ${JSON.stringify(payload?.detail ?? payload)}`)
  }
  return payload
}

async function synthesise(text) {
  const data = await elevenlabs(
    `/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`,
    {
      text,
      model_id: MODEL_ID,
      voice_settings: { stability: STABILITY },
      seed: SEED,
    },
  )
  // The alignment over the original text, never `normalized_alignment`: the
  // whole cue mechanism rests on the word count matching the written prose,
  // and normalisation is exactly the step that changes it.
  const words = wordsFromAlignment(data.alignment)
  if (!words.length) throw new Error('response carried no alignment — cues cannot be timed')
  const duration = data.alignment.character_end_times_seconds.at(-1)
  return { audio: Buffer.from(data.audio_base64, 'base64'), duration, words }
}

/**
 * Writes the clip at NARRATION_PACE, returning the measured duration of what
 * actually landed on disk (or null when ffprobe's answer doesn't parse, in
 * which case the caller keeps the scaled alignment figure — close enough, and
 * always ≥ the last spoken word).
 */
async function writeAudio(audio, path) {
  if (PACE === 1) {
    await writeFile(path, audio)
    return null
  }
  const natural = `${path}.natural.mp3`
  await writeFile(natural, audio)
  try {
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', natural, '-filter:a', `atempo=${PACE}`, '-b:a', '160k', path])
  } catch (error) {
    throw new Error(`ffmpeg atempo failed (is ffmpeg on PATH?) — ${error.message}`)
  } finally {
    await unlink(natural).catch(() => {})
  }
  const probed = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path])
    .then(({ stdout }) => Number.parseFloat(stdout))
    .catch(() => null)
  return Number.isFinite(probed) ? probed : null
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
const previousEntries = Object.values(previous.slides ?? {})
const previousByNarrationKey = new Map(
  previousEntries.filter(entry => entry.narrationKey).map(entry => [entry.narrationKey, entry]),
)
const previousByTranscript = new Map()
for (const entry of previousEntries) {
  if (!entry.transcript) continue
  const matches = previousByTranscript.get(entry.transcript) ?? []
  matches.push(entry)
  previousByTranscript.set(entry.transcript, matches)
}

const narrationKeyFor = entry => `${entry.file}:${entry.sourceIndex}`
const previousFor = entry => {
  const byKey = previousByNarrationKey.get(narrationKeyFor(entry))
  if (byKey) return byKey
  const byTranscript = previousByTranscript.get(entry.text)
  return byTranscript?.length === 1 ? byTranscript[0] : null
}

const manifest = {
  voice: VOICE_ID,
  model: MODEL_ID,
  pace: PACE,
  // The rest frame shown before a clip has buffered. The mascot manifest
  // usually shadows it; carried over because nothing in this pipeline
  // regenerates it.
  still: previous.still ?? null,
  slides: {},
}

const withNarrationMetadata = (built, entry, words = null) => ({
  ...built,
  narrationKey: narrationKeyFor(entry),
  transcript: entry.text,
  captions: buildCaptions(entry.text, words, built.duration),
})
let spent = 0
let reused = 0
let restamped = 0
const absent = []

/**
 * A failed synthesis mid-run must not lose the clips before it. The manifest is
 * written once at the end, so an exception (a 401 on an exhausted quota is the
 * likely one) used to exit with the new clips on disk but no entries for them.
 * On failure the untouched slides are carried over from the previous manifest
 * and the partial result is saved before the error propagates.
 */
async function saveProgress(error, done) {
  for (const entry of entries) {
    const cached = previousFor(entry)
    if (manifest.slides[entry.no] || !cached) continue
    manifest.slides[entry.no] = withNarrationMetadata(cached, entry)
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
  if ((only && entry.file !== only) || (slides.size && !slides.has(entry.no))) {
    // Carry the untouched slides through, or a filtered run would publish a
    // manifest containing only the section it rebuilt.
    const kept = previousFor(entry)
    if (kept) {
      manifest.slides[entry.no] = withNarrationMetadata(kept, entry)
      // Rebuilding these would defeat --only, so say so instead of fixing it.
      if (!dryRun && !(await hasAsset(kept))) absent.push(entry.no)
    }
    return
  }

  const hash = createHash('sha256')
    .update(`elevenlabs ${MODEL_ID} ${VOICE_ID} ${STABILITY} ${PACE} ${entry.text} ${CUE_LEAD_SECONDS}`)
    .digest('hex')
    .slice(0, 12)

  const cached = previousFor(entry)

  if (restamp.has(entry.no) && !dryRun) {
    if (!cached || !(await hasAsset(cached))) {
      fail(`--restamp: slide ${entry.no} has no asset on disk to restamp`)
    }
    if (cached.video) {
      // A video entry is a retired HeyGen render; its hash was keyed on that
      // pipeline's parameters, which no longer exist here. Asserting it onto an
      // ElevenLabs hash would claim a clip in the old voice is the new voice.
      fail(`--restamp: slide ${entry.no} is a legacy video entry — rebuild it instead`)
    }
    manifest.slides[entry.no] = withNarrationMetadata({ ...cached, hash }, entry)
    restamped++
    console.log(`  ${String(entry.no).padStart(2)} restamped ${cached.hash} -> ${hash} (no synthesis)`)
    return
  }

  if (!force && cached?.hash === hash && !dryRun) {
    if (await hasAsset(cached)) {
      manifest.slides[entry.no] = withNarrationMetadata(cached, entry)
      reused++
      return
    }
    // A lost mp3 falls through and re-synthesises: TTS results are not stored
    // account-side, and re-synthesis is cheap and seeded.
  }

  const label = `${String(entry.no).padStart(2)} ${entry.title || entry.layout}`

  // A dry run exists to show cue times without spending; for a slide whose
  // speech is already built, the times are in the manifest. Synthesis bills
  // per character on every call — cheap per slide, not free per run.
  if (dryRun && cached && cached.hash === hash) {
    console.log(`  ${label}  ${cached.duration.toFixed(1)}s  cues [${cached.cues.map(c => c.toFixed(1)).join(', ')}]  (cached)`)
    return
  }

  const { audio, duration: naturalDuration, words: naturalWords } = await synthesise(entry.text)
  const words = scaleWordTimes(naturalWords, PACE)
  let duration = naturalDuration / PACE

  const stem = `slide-${String(entry.no).padStart(2, '0')}-${hash}`
  const file = `${stem}.mp3`
  if (!dryRun) {
    duration = (await writeAudio(audio, join(OUT_DIR, file))) ?? duration
  }

  const { cues, estimated } = resolveCues(entry.segments, words, duration)
  spent += duration

  if (estimated && entry.segments.length > 1) {
    console.warn(`  ${label}: word timings didn't line up, cues spaced evenly — check this slide`)
  }

  if (dryRun) {
    console.log(`  ${label}  ${duration.toFixed(1)}s  cues [${cues.map(c => c.toFixed(1)).join(', ')}]`)
    return
  }

  manifest.slides[entry.no] = withNarrationMetadata(
    { hash, audio: `/narration/${file}`, duration, cues },
    entry,
    words,
  )
  console.log(`  ${label}  ${duration.toFixed(1)}s  ${cues.length} cues  -> ${file}`)
}

if (!dryRun) await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

/**
 * Assets are content-hashed, so every prose edit and every setting change
 * leaves the previous file behind. Nothing reads them again — the manifest only
 * ever points at current hashes — but they are shipped: `public/` is copied
 * wholesale into `dist/`, so stale clips would bloat the build without ever
 * being played. Superseded HeyGen-era .mp4s land here too, once their slides
 * re-synthesise in the new voice.
 *
 * Safe to run after a filtered `--only` or `--slides` pass: untouched slides are carried into
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
    `${reused} reused, ` +
    `${restamped ? `${restamped} restamped, ` : ''}` +
    `${(spent / 60).toFixed(1)} min of new speech at ${PACE}x pace.` +
    (pruned?.count ? ` Pruned ${pruned.count} orphaned asset(s), ${pruned.mb.toFixed(1)} MB.` : ''),
)

if (absent.length) {
  const filter = only ? `--only=${only}` : `--slides=${[...slides].join(',')}`
  console.warn(
    `! ${absent.length} slide(s) outside ${filter} name an asset that is not on disk ` +
      `(slide ${absent.join(', ')}). Auto-mode will 404 on them until you re-run without a filter.`,
  )
}
