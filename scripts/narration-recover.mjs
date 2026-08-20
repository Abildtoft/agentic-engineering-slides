/**
 * Restores narration clips the manifest names but that aren't on disk, by
 * downloading them back from HeyGen instead of re-rendering them.
 *
 * The clips are gitignored and the manifest is tracked, so a fresh clone or a
 * cleaned `public/narration/` loses every asset while keeping the record of
 * them. Re-rendering would work, but it is the wrong repair twice over: it
 * costs money for words already paid for, and a render is not reproducible —
 * the same prose comes back as a *different take*, with different head movement
 * and timing, quietly replacing clips that were already reviewed.
 *
 * Two ways a clip is identified:
 *
 *   1. `videoId` in the manifest — a direct lookup. Builds record it, so this
 *      is the path for anything rendered from now on.
 *   2. Duration, for entries predating that field. Every render in the account
 *      is listed with its duration, and the manifest's durations are distinct,
 *      so this resolves — but the account also holds re-renders of the same
 *      slide at identical durations, so where there is more than one candidate
 *      the newest wins (it is the one the current manifest hash was written
 *      alongside) and the ambiguity is reported rather than hidden.
 *
 * Audio-mode assets cannot be recovered this way. A TTS result is not a video
 * and is not listed anywhere, so `.mp3` entries are reported and left for
 * `yarn narration:audio` to re-synthesise — which is cheap, unlike a render.
 *
 * Usage:
 *   HEYGEN_API_KEY=... yarn narration:recover [--dry-run]
 */
import { readFile, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ROOT } from './narration-lib.mjs'

const API = 'https://api.heygen.com'
const OUT_DIR = join(ROOT, 'public', 'narration')
const MANIFEST = join(OUT_DIR, 'manifest.json')

/** Durations come from two different measurements of the same speech — the TTS
    response and the rendered file — which agree to about 11ms, not exactly. */
const DURATION_TOLERANCE_SECONDS = 0.05

const dryRun = process.argv.includes('--dry-run')
const { HEYGEN_API_KEY } = process.env

if (!HEYGEN_API_KEY) {
  console.error('narration-recover: HEYGEN_API_KEY is not set — add it to .env (see .env.example)')
  process.exit(1)
}

async function heygen(path) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'X-Api-Key': HEYGEN_API_KEY, Accept: 'application/json' },
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok || payload?.error) {
    throw new Error(`GET ${path} -> ${response.status} ${JSON.stringify(payload?.error ?? payload)}`)
  }
  // The envelope, not payload.data: the page cursor sits beside `data`.
  return payload
}

/**
 * Every rendered video in the account.
 *
 * The page parameter is `token`, matching /v3/voices. `next_token` and
 * `page_token` are both accepted and both ignored — they return page one again,
 * so a loop built on either collects the same 20 videos forever while `has_more`
 * stays true.
 *
 * Termination is on an empty page, not on `has_more`: measured on this account,
 * a 21-video listing pages 20 → 1 → 0 and `has_more` only turns false on that
 * final empty page.
 */
async function allVideos() {
  const collected = []
  let token = null
  for (let page = 0; page < 200; page++) {
    const payload = await heygen(`/v3/videos?limit=100${token ? `&token=${encodeURIComponent(token)}` : ''}`)
    const data = payload.data ?? payload
    const items = Array.isArray(data) ? data : (data.videos ?? [])
    collected.push(...items)
    token = payload.next_token
    if (!items.length || !payload.has_more || !token) break
  }
  return collected
}

async function download(url, path) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`download -> ${response.status}`)
  await writeFile(path, Buffer.from(await response.arrayBuffer()))
}

const onDisk = file => stat(join(OUT_DIR, file)).then(() => true, () => false)

const manifest = JSON.parse(await readFile(MANIFEST, 'utf-8'))
const slides = Object.entries(manifest.slides ?? {})

const missing = []
for (const [no, slide] of slides) {
  const asset = slide.video ?? slide.audio
  if (!asset) continue
  const file = asset.split('/').pop()
  if (!(await onDisk(file))) missing.push({ no, slide, file, isVideo: Boolean(slide.video) })
}

if (!missing.length) {
  console.log(`All ${slides.length} narration assets are present. Nothing to recover.`)
  process.exit(0)
}

const unrecoverable = missing.filter(m => !m.isVideo)
const targets = missing.filter(m => m.isVideo)

console.log(`${missing.length} of ${slides.length} assets missing from public/narration/.\n`)

const catalogue = targets.some(t => !t.slide.videoId) ? await allVideos() : []
if (catalogue.length) console.log(`Listed ${catalogue.length} renders in the account.\n`)

let restored = 0
let bytes = 0
const unmatched = []

for (const { no, slide, file } of targets) {
  let videoId = slide.videoId
  let note = 'by id'

  if (!videoId) {
    const candidates = catalogue
      .filter(v => v.status === 'completed' && Math.abs(v.duration - slide.duration) < DURATION_TOLERANCE_SECONDS)
      .sort((a, b) => b.created_at - a.created_at)
    if (!candidates.length) {
      unmatched.push(no)
      console.log(`  slide ${no.padStart(2)}  no render matches ${slide.duration.toFixed(3)}s`)
      continue
    }
    videoId = candidates[0].id
    note =
      candidates.length > 1
        ? `newest of ${candidates.length} at ${slide.duration.toFixed(3)}s`
        : `sole match at ${slide.duration.toFixed(3)}s`
  }

  if (dryRun) {
    console.log(`  slide ${no.padStart(2)}  ${videoId.slice(0, 8)}  ${note}  -> ${file}`)
    continue
  }

  // The listing's video_url is signed and expires, so it is re-read here rather
  // than reused from the catalogue fetched earlier in the run.
  const detail = await heygen(`/v3/videos/${videoId}`)
  const data = detail.data ?? detail
  await download(data.video_url ?? data.url, join(OUT_DIR, file))
  const size = (await stat(join(OUT_DIR, file))).size
  bytes += size
  restored++
  manifest.slides[no] = { ...slide, videoId }
  console.log(`  slide ${no.padStart(2)}  ${videoId.slice(0, 8)}  ${note}  -> ${file}  ${(size / 1024 / 1024).toFixed(1)} MB`)
}

if (!dryRun && restored) {
  // Backfilling videoId is most of the point: it turns every future recovery
  // into a lookup instead of a duration guess.
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
}

console.log(
  `\n${dryRun ? 'Dry run. ' : ''}${restored} clip(s) recovered` +
    `${bytes ? `, ${(bytes / 1024 / 1024).toFixed(0)} MB` : ''}, nothing rendered, nothing spent.`,
)

if (unrecoverable.length) {
  console.warn(
    `! ${unrecoverable.length} audio-mode asset(s) can't be recovered (slide ` +
      `${unrecoverable.map(m => m.no).join(', ')}) — a TTS result isn't a video and isn't listed. ` +
      `Re-run \`yarn narration:audio\` to re-synthesise them.`,
  )
}

if (unmatched.length) {
  console.warn(
    `! slide ${unmatched.join(', ')} had no matching render in the account — ` +
      `re-run \`yarn narration:build\` to render ${unmatched.length > 1 ? 'them' : 'it'} again.`,
  )
}
