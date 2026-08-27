/**
 * Renders a Mascotbot character speaking each slide's narration, as a video
 * clip the deck's auto-mode plays as its face.
 *
 * Input is the speech the narration build already produced — the `.mp3` or
 * `.mp4` each manifest entry points at — so this never synthesises anything
 * and never calls a TTS API. Per slide:
 *
 *   1. ffmpeg extracts 16 kHz mono float32 from the speech asset.
 *   2. Mascotbot's lip-sync model turns that into a viseme timeline, once; the
 *      JSON is cached, and replaying it is not metered.
 *   3. Headless Chrome renders the Rive character frame by frame on a virtual
 *      clock (scripts/mascot-render/), seeking the timeline to each frame's
 *      time, so the render is deterministic and runs as fast as the encoder.
 *   4. ffmpeg muxes the frames with the original speech into an H.264 mp4.
 *
 * The result is written to public/narration/mascot.json, a sibling of
 * manifest.json that the player layers on top: where a mascot clip exists for
 * a slide's *current* speech asset, it plays instead of entry.video/audio. The
 * speech manifest and clips are left exactly as they are, so going back is
 * deleting one file.
 *
 * Usage:
 *   MASCOT_API_KEY=mascot_dev_… yarn narration:mascot [--slides=11-59] [--force]
 *     [--mascot=retrobot] [--fps=24] [--size=512] [--bg=#ffffff] [--zoom=1.35] [--focus-y=0.44]
 *   yarn narration:mascot --optimize-existing
 *
 * A `mascot_dev_…` key is the right one: the render runs on localhost, which is
 * the only origin a dev key accepts, and the deck ships the video, not the SDK.
 * Needs ffmpeg on PATH and Google Chrome installed (driven via playwright-core).
 */
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createServer } from 'vite'
import { chromium } from 'playwright-core'
import { ROOT } from './narration-lib.mjs'

const OUT_DIR = join(ROOT, 'public', 'narration')
const MANIFEST = join(OUT_DIR, 'manifest.json')
const MASCOT_MANIFEST = join(OUT_DIR, 'mascot.json')
const CACHE_DIR = join(ROOT, 'node_modules', '.cache', 'narration-mascot')
const RENDER_DIR = join(ROOT, 'scripts', 'mascot-render')
const AVATARS_API = 'https://license.mascot.bot'

const args = process.argv.slice(2)
const flag = name => args.includes(`--${name}`)
const option = (name, fallback) => args.find(a => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback

const force = flag('force')
const optimizeExisting = flag('optimize-existing')
const mascotId = option('mascot', 'retrobot')
// The tile tops out around 300 physical pixels on a 1080p display. 512px keeps
// it crisp on dense screens without shipping 720px frames that are never seen.
const fps = Number(option('fps', 24))
const size = Number(option('size', 512))
const bg = option('bg', '#ffffff')
const zoom = Number(option('zoom', 1.35))
const focusY = Number(option('focus-y', 0.44))
const slides = parseSlideList(option('slides'))
const BATCH = 30

const { MASCOT_API_KEY } = process.env
if (!MASCOT_API_KEY && !optimizeExisting) fail('MASCOT_API_KEY is not set — create a mascot_dev_… key at app.mascot.bot/api-keys')

function fail(message) {
  console.error(`narration-mascot: ${message}`)
  process.exit(1)
}

/** "11-59,3" -> Set {3,11,...,59}; undefined -> null (every slide). */
function parseSlideList(spec) {
  if (!spec) return null
  const set = new Set()
  for (const part of spec.split(',').filter(Boolean)) {
    const [from, to = from] = part.split('-').map(Number)
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from) fail(`--slides: "${part}" is not a slide number or range`)
    for (let n = from; n <= to; n++) set.add(n)
  }
  return set
}

async function exists(path) {
  return stat(path).then(() => true, () => false)
}

function run(cmd, cmdArgs, { input } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { stdio: [input ? 'pipe' : 'ignore', 'ignore', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', chunk => (stderr += chunk))
    child.on('error', reject)
    child.on('close', code => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${stderr.slice(-2000)}`))))
    if (input) input(child.stdin)
  })
}

/**
 * Re-encodes already-reviewed mascot clips for the small on-slide tile. This
 * path is deliberately offline: it does not load the Rive character, run
 * inference, or call a metered service. New filenames use the cache hash the
 * renderer will calculate for these settings, so later renders see honest
 * cache entries rather than 720px files masquerading as 512px output.
 */
async function optimizeExistingClips() {
  const manifest = JSON.parse(await readFile(MASCOT_MANIFEST, 'utf-8'))
  const previousFiles = []

  for (const [no, entry] of Object.entries(manifest.slides ?? {})) {
    const oldFile = entry.video.split('/').pop()
    const hash = createHash('sha256')
      .update(`${entry.source} ${manifest.mascot.id}@${manifest.mascot.version} ${fps} ${size} ${bg} ${zoom} ${focusY} v1`)
      .digest('hex')
      .slice(0, 12)
    const file = `slide-${String(no).padStart(2, '0')}-mascot-${hash}.mp4`

    if (!(await exists(join(OUT_DIR, file)))) {
      await run('ffmpeg', [
        '-y', '-loglevel', 'error', '-i', join(OUT_DIR, oldFile),
        '-map', '0:v', '-map', '0:a?', '-vf', `scale=${size}:${size}`, '-r', String(fps),
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', join(OUT_DIR, file),
      ])
    }
    manifest.slides[no] = { ...entry, hash, video: `/narration/${file}` }
    if (oldFile !== file) previousFiles.push(oldFile)
    console.log(`  ${String(no).padStart(2)} ${oldFile} -> ${file}`)
  }

  const stillFile = join(OUT_DIR, 'mascot-still.png')
  const nextStill = join(OUT_DIR, 'mascot-still.optimized.png')
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', stillFile, '-vf', `scale=${size}:${size}`, nextStill])
  await rename(nextStill, stillFile)

  manifest.mascot = { ...manifest.mascot, fps, size, bg, zoom, focusY }
  await writeFile(MASCOT_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  for (const file of previousFiles) await unlink(join(OUT_DIR, file)).catch(() => {})
  console.log(`\noptimized ${Object.keys(manifest.slides ?? {}).length} mascot clips to ${size}px at ${fps}fps`)
}

if (optimizeExisting) {
  await optimizeExistingClips()
  process.exit(0)
}

/** Pin the character: the API's versions are immutable, so a cached .riv never
    goes stale, and the version rides in the clip hash. */
async function fetchMascot() {
  const manifest = await fetch(`${AVATARS_API}/v1/avatars`).then(r => r.json())
  const avatar = manifest.avatars.find(a => a.id === mascotId)
  if (!avatar) fail(`no mascot "${mascotId}" — available: ${manifest.avatars.map(a => a.id).join(', ')}`)
  const version = avatar.latest
  const file = join(CACHE_DIR, `${mascotId}@${version}.riv`)
  if (!(await exists(file))) {
    const bytes = await fetch(`${AVATARS_API}/v1/avatars/${mascotId}/download?version=${version}`).then(r => r.arrayBuffer())
    await writeFile(file, Buffer.from(bytes))
  }
  return { id: mascotId, version, file, stateMachine: avatar.metadata?.stateMachine ?? 'mascotStateMachine' }
}

await mkdir(CACHE_DIR, { recursive: true })
const speech = JSON.parse(await readFile(MANIFEST, 'utf-8'))
const previous = JSON.parse(await readFile(MASCOT_MANIFEST, 'utf-8').catch(() => '{"slides":{}}'))
const previousBySource = new Map(
  Object.values(previous.slides ?? {}).filter(entry => entry.source).map(entry => [entry.source, entry]),
)
const mascot = await fetchMascot()

const server = await createServer({
  root: RENDER_DIR,
  configFile: false,
  logLevel: 'error',
  // Its own dep cache: sharing node_modules/.vite with a running Slidev dev
  // server rewrote that server's pre-bundled deps and took the deck down with
  // "504 Outdated Optimize Dep" until it was restarted.
  cacheDir: join(CACHE_DIR, 'vite'),
  server: { port: 0, strictPort: false, fs: { allow: [ROOT, CACHE_DIR] } },
  // The SDK and Rive resolve from the project's node_modules, not the page's dir.
  resolve: { preserveSymlinks: false },
})
await server.listen()
const origin = server.resolvedUrls.local[0].replace(/\/$/, '')
const fsUrl = path => `${origin}/@fs${path}`

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: size, height: size } })
page.on('console', message => {
  if (['error', 'warning', 'log'].includes(message.type()) && !/404|webauthn|\[vite\]/.test(message.text())) console.error(`  [page] ${message.text()}`)
})
page.on('pageerror', error => console.error(`  [page] ${error.message}`))

/** Slides not yet reached in this run keep their previous entry, so a partial
    manifest is always a complete one. */
async function saveManifest(manifest) {
  const merged = { ...manifest, slides: { ...previous.slides, ...manifest.slides } }
  await writeFile(MASCOT_MANIFEST, `${JSON.stringify(merged, null, 2)}\n`)
  return merged
}

/** Start a page-side job and wait for it to settle; see main.js for why the
    result is polled rather than returned from evaluate. */
async function pageJob(name, start, arg, timeout = 120_000) {
  await page.evaluate(start, arg)
  await page.waitForFunction(n => window.__jobs[n]?.done, name, { timeout, polling: 100 })
  const result = await page.evaluate(n => window.__jobs[n], name)
  if (result.error) throw new Error(`${name}: ${result.error}`)
  return result.value
}

try {
  await page.goto(`${origin}/`)
  await page.waitForFunction(() => window.__mascotReady, null, { timeout: 30_000 })
  const init = await pageJob(
    'init',
    opts => window.mascot.init(opts),
    { apiKey: MASCOT_API_KEY, rivUrl: fsUrl(mascot.file), stateMachine: mascot.stateMachine, size, bg, zoom, focusY },
  )
  console.log(`mascot ${mascot.id}@${mascot.version} (${mascot.stateMachine}), lip-sync ${init.status}, inputs: ${init.inputs.join(', ') || 'none found'}`)
  if (!init.inputs.includes('100')) fail('the character exposes no viseme inputs — the mouth would never move')

  const manifest = {
    mascot: { id: mascot.id, version: mascot.version, fps, size, bg, zoom, focusY },
    still: '/narration/mascot-still.png',
    slides: {},
  }

  const stillPng = await page.evaluate(() => window.mascot.still())
  await writeFile(join(OUT_DIR, 'mascot-still.png'), Buffer.from(stillPng, 'base64'))

  let rendered = 0
  let reused = 0
  let renderedSeconds = 0
  const started = Date.now()

  for (const [no, entry] of Object.entries(speech.slides)) {
    const source = (entry.video ?? entry.audio)?.split('/').pop()
    if (!source) continue

    const cached = previousBySource.get(source) ?? previous.slides?.[no]
    if (!(await exists(join(OUT_DIR, source)))) {
      if (cached) manifest.slides[no] = cached
      continue
    }

    const hash = createHash('sha256')
      .update(`${source} ${mascot.id}@${mascot.version} ${fps} ${size} ${bg} ${zoom} ${focusY} v1`)
      .digest('hex')
      .slice(0, 12)
    const file = `slide-${String(no).padStart(2, '0')}-mascot-${hash}.mp4`
    if (slides && !slides.has(Number(no))) {
      if (cached) manifest.slides[no] = cached
      continue
    }
    if (!force && cached?.hash === hash && (await exists(join(OUT_DIR, file)))) {
      manifest.slides[no] = cached
      reused++
      continue
    }

    const label = `${String(no).padStart(2)} ${source}`
    const t0 = Date.now()

    // 1. Speech -> 16 kHz mono float32. Keyed by the source asset, so a
    //    re-synthesised slide gets fresh audio and an untouched one reuses it.
    const pcm = join(CACHE_DIR, `${source}.f32`)
    if (!(await exists(pcm))) {
      await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', join(OUT_DIR, source), '-vn', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-acodec', 'pcm_f32le', pcm])
    }

    // 2. Viseme timeline, inferred once and cached: replay is free, inference is metered.
    const timelinePath = join(CACHE_DIR, `${source}.timeline.json`)
    let timeline
    if (await exists(timelinePath)) {
      timeline = JSON.parse(await readFile(timelinePath, 'utf-8'))
    } else {
      // Paced to the licence refresh: about real time, see main.js.
      process.stdout.write(`  ${label}  inferring lip-sync (~${Math.ceil((entry.duration ?? 60) / 8) * 10}s)`)
      timeline = await pageJob('timeline', url => window.mascot.timeline(url), fsUrl(pcm), 600_000)
      await writeFile(timelinePath, JSON.stringify(timeline))
    }
    await page.evaluate(json => window.mascot.setTimeline(json), timeline.timeline)

    // 3 + 4. Frames on the virtual clock, piped straight into the encoder.
    const durationMs = Math.max(timeline.durationMs, (entry.duration ?? 0) * 1000)
    const total = Math.ceil((durationMs / 1000) * fps)
    const outPath = join(OUT_DIR, file)
    await run(
      'ffmpeg',
      [
        '-y', '-loglevel', 'error',
        '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', 'pipe:0',
        '-i', join(OUT_DIR, source),
        '-map', '0:v', '-map', '1:a',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '96k',
        '-shortest', '-movflags', '+faststart',
        outPath,
      ],
      {
        input: async stdin => {
          try {
            for (let from = 0; from < total; from += BATCH) {
              const count = Math.min(BATCH, total - from)
              const frames = await page.evaluate(
                opts => window.mascot.frames(opts),
                { fromMs: (from / fps) * 1000, count, fps },
              )
              for (const frame of frames) {
                if (!stdin.write(Buffer.from(frame, 'base64'))) await new Promise(resolve => stdin.once('drain', resolve))
              }
              process.stdout.write(`\r  ${label}  ${Math.min(from + count, total)}/${total} frames`)
            }
          } finally {
            stdin.end()
          }
        },
      },
    )

    manifest.slides[no] = { hash, source, video: `/narration/${file}`, durationMs: timeline.durationMs, speechMs: timeline.speechMs }
    // Saved per slide: a crash mid-run must not cost the clips before it — an
    // unwritten manifest once let the next run prune two finished clips as stale.
    await saveManifest(manifest)
    rendered++
    renderedSeconds += durationMs / 1000
    const took = (Date.now() - t0) / 1000
    console.log(`\r  ${label}  ${(durationMs / 1000).toFixed(1)}s in ${took.toFixed(0)}s (${(durationMs / 1000 / took).toFixed(1)}x)  -> ${file}`)
  }

  const completeManifest = await saveManifest(manifest)

  // Only this script's own output is pruned; the speech clips are not ours to touch.
  // A filtered run may only have source media for a subset of slides in this
  // workspace. Prune against the complete saved manifest, including carried
  // entries, rather than deleting their tracked clips as if they were stale.
  const keep = new Set(Object.values(completeManifest.slides).map(s => s.video.split('/').pop()))
  let pruned = 0
  for (const name of await readdir(OUT_DIR)) {
    if (/-mascot-[0-9a-f]{12}\.mp4$/.test(name) && !keep.has(name)) {
      await unlink(join(OUT_DIR, name))
      pruned++
    }
  }

  console.log(
    `\n${Object.keys(manifest.slides).length} mascot clips, ${reused} reused, ${rendered} rendered ` +
      `(${(renderedSeconds / 60).toFixed(1)} min of speech in ${((Date.now() - started) / 60000).toFixed(1)} min)` +
      (pruned ? `, pruned ${pruned} stale clip(s)` : ''),
  )
} finally {
  await browser.close()
  await server.close()
}
