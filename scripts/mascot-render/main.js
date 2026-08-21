/**
 * Browser half of scripts/narration-mascot.mjs. Node drives it over
 * page.evaluate: init once, then per slide a timeline from the speech audio and
 * a sequence of frames stepped on the virtual clock in index.html.
 *
 * The SDK schedules its licence handshake and inference on
 * requestAnimationFrame, so those phases run with the clock ticking at wall
 * rate (`__clock.auto(true)`); frames are stepped manually afterwards.
 */
import { Rive, Layout, Fit, Alignment } from '@rive-app/webgl2'
import { LipsyncClient, parseTimeline } from '@mascotbot/core'
import { MascotPlayback, getRiveInputs } from '@mascotbot/core/rive'

const riveCanvas = document.getElementById('rive')
const outCanvas = document.getElementById('out')
const ctx = outCanvas.getContext('2d')

let client
let rive
let playback
let background = '#ffffff'
let crop = { size: 0, x: 0, y: 0 }

/**
 * Long SDK calls run as named jobs that node polls for, rather than as the
 * return value of page.evaluate: a promise held across the SDK's worker
 * round-trips was seen garbage-collected by the driver before it settled.
 */
window.__jobs = {}
function job(name, fn) {
  window.__jobs[name] = { done: false }
  fn().then(
    value => (window.__jobs[name] = { done: true, value }),
    error => (window.__jobs[name] = { done: true, error: String(error?.stack ?? error) }),
  )
}

let licence

async function connect() {
  window.__clock.auto(true)
  try {
    client?.close()
    client = await LipsyncClient.init({ apiKey: licence, userId: 'narration-render' })
  } finally {
    window.__clock.auto(false)
  }
}

/** Resolves on the SDK's next successful licence refresh (the budget top-up). */
function nextRefresh() {
  window.__clock.auto(true)
  return new Promise(resolve => {
    const off = client.on('refresh', () => {
      off()
      resolve()
    })
  })
}

async function initialise({ apiKey, rivUrl, stateMachine, size, bg, zoom, focusY }) {
  background = bg
  licence = apiKey
  // Rive draws the whole artboard letterboxed into its canvas, which leaves the
  // stock characters in the middle ~55% of the frame. The Rive canvas is made
  // `zoom` times larger than the output and a `size` window is cut from it,
  // centred horizontally and at `focusY` vertically — so the crop costs no
  // pixels, the character fills the tile, and the values ride in the clip hash.
  const full = Math.round(size * zoom)
  riveCanvas.width = riveCanvas.height = full
  outCanvas.width = outCanvas.height = size
  crop = {
    size,
    x: Math.round((full - size) / 2),
    y: Math.round(Math.min(Math.max(full * focusY - size / 2, 0), full - size)),
  }
  await connect()

  await new Promise((resolve, reject) => {
    rive = new Rive({
      src: rivUrl,
      canvas: riveCanvas,
      autoplay: true,
      artboard: 'Character',
      stateMachines: stateMachine,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => resolve(),
      onLoadError: error => reject(new Error(`rive load failed: ${error}`)),
    })
  })
  // The runtime sizes its drawing surface from the canvas on load.
  rive.resizeDrawingSurfaceToCanvas()
  const riveInputs = getRiveInputs(rive)
  playback = new MascotPlayback({ riveInputs, stream: false, enableNaturalLipSync: true })
  // Let the idle animation settle out of its first frame before anything is captured.
  for (let i = 0; i < 30; i++) window.__clock.advance(1000 / 30)
  return { status: client.status, inputs: ['100', 'is_speaking', 'stress'].filter(name => riveInputs.has(name)) }
}

const SAMPLE_RATE = 16_000

/** [start, end) sample ranges of at most `max` samples, each boundary moved
    back to the quietest 10ms frame within the trailing `window`. */
function chunk(samples, max, window) {
  const ranges = []
  let start = 0
  while (samples.length - start > max) {
    const frame = SAMPLE_RATE / 100
    let cut = start + max
    let quietest = Infinity
    for (let at = start + max - window; at + frame <= start + max; at += frame) {
      let energy = 0
      for (let i = at; i < at + frame; i++) energy += samples[i] * samples[i]
      if (energy < quietest) {
        quietest = energy
        cut = at + frame / 2
      }
    }
    ranges.push({ start, end: cut })
    start = cut
  }
  ranges.push({ start, end: samples.length })
  return ranges
}

/** Concatenate per-chunk timelines into one, in the same shape processAudio
    returns, so the cache and the player never know it was split. */
function stitch(parts, durationMs) {
  if (parts.length === 1) {
    const { timeline, durationMs: d, speechMs } = parts[0]
    return { timeline, durationMs: d, speechMs }
  }
  const cues = []
  let speechMs = 0
  for (const part of parts) {
    speechMs += part.speechMs
    for (const cue of part.timeline.cues) {
      const t = Math.round(cue.t + part.offsetMs)
      // Adjacent chunks both start at t:0 with a rest cue; keep one.
      if (cues.length && cues[cues.length - 1].v === cue.v) continue
      if (cues.length && t <= cues[cues.length - 1].t) continue
      cues.push({ t, v: cue.v })
    }
  }
  const { version, frameMs } = parts[0].timeline
  return { timeline: { version, durationMs: Math.round(durationMs), speechMs, frameMs, cues }, durationMs: Math.round(durationMs), speechMs }
}

function paint() {
  ctx.fillStyle = background
  ctx.fillRect(0, 0, outCanvas.width, outCanvas.height)
  ctx.drawImage(riveCanvas, crop.x, crop.y, crop.size, crop.size, 0, 0, crop.size, crop.size)
}

window.mascot = {
  /** Load the character and licence the lip-sync engine. Poll __jobs.init. */
  init(opts) {
    job('init', () => initialise(opts))
  },

  /** 16 kHz mono float32 little-endian, as ffmpeg writes it, to a viseme
      timeline. Poll __jobs.timeline. */
  timeline(audioUrl) {
    job('timeline', async () => {
      const buffer = await fetch(audioUrl).then(r => {
        if (!r.ok) throw new Error(`${audioUrl} -> ${r.status}`)
        return r.arrayBuffer()
      })
      const samples = new Float32Array(buffer)
      const infer = async chunk => {
        window.__clock.auto(true)
        try {
          return await client.processAudio(chunk)
        } finally {
          window.__clock.auto(false)
        }
      }
      // The licence meters inference in a budget that a server-signed refresh
      // tops up every 10s of wall time (REFRESH_INTERVAL_MS in the SDK) — it
      // is sized for real-time use, and `processAudio` on a whole clip burns
      // through it in seconds; the worker then fails with `w14_-33`, which the
      // SDK itself describes as "inference budget exhausted without a
      // server-signed refresh". So audio is inferred in chunks of at most 8s,
      // cut at the quietest 10ms in the last two seconds, one chunk per
      // refresh. Roughly real time, once per clip, and the timeline is cached.
      const parts = []
      const chunks = chunk(samples, SAMPLE_RATE * 8, SAMPLE_RATE * 2)
      for (const [index, { start, end }] of chunks.entries()) {
        if (index > 0) await nextRefresh()
        // A copy, not a view: a view shares the whole buffer, and a worker
        // that takes ownership of it would detach every later chunk.
        const piece = samples.slice(start, end)
        let result
        try {
          result = await infer(piece)
        } catch (error) {
          console.warn(`processAudio failed on chunk ${index + 1}/${chunks.length} (${error?.message ?? error}); reconnecting and retrying once`)
          await connect()
          result = await infer(piece)
        }
        parts.push({ offsetMs: (start / SAMPLE_RATE) * 1000, ...result })
      }
      return stitch(parts, (samples.length / SAMPLE_RATE) * 1000)
    })
  },

  /**
   * Arm a timeline and start it. Playback keeps its own clock off the patched
   * performance.now, and its tick runs inside the patched rAF, so from here
   * every `advance()` moves the mouth exactly that far. `seek()` was measured
   * to write nothing under this clock — it is not used.
   */
  setTimeline(json) {
    playback.reset()
    playback.setTimeline(parseTimeline(json))
    playback.play()
  },

  /**
   * Render the next `count` frames, 1000/fps apart, JPEG-encoded. Frames are
   * produced strictly in order from the start of the timeline, so the clock
   * alone is the position; `fromMs` is only checked against it.
   */
  frames({ fromMs, count, fps, quality = 0.92 }) {
    const step = 1000 / fps
    const out = []
    for (let i = 0; i < count; i++) {
      window.__clock.advance(step)
      paint()
      out.push(outCanvas.toDataURL('image/jpeg', quality).split(',')[1])
    }
    return out
  },

  /** One frame at rest, for the still shown between clips. */
  still() {
    playback.reset()
    window.__clock.advance(1000 / 30)
    paint()
    return outCanvas.toDataURL('image/png').split(',')[1]
  },
}
window.__mascotReady = true
