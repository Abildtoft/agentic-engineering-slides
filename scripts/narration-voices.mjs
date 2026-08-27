/**
 * Preflight for `yarn narration:audio`. Confirms the key works, that the
 * configured voice and model exist on the account, that the character quota
 * covers the deck, and that ffmpeg is present when a pace change needs it.
 *
 * The voice check is the one that earns its keep: a mistyped voice id fails
 * with a 404 only after the first slide's request, and a voice that isn't the
 * one you meant synthesises the whole deck in the wrong person before anyone
 * listens. Resolving it here prints the name and labels so "friendly American
 * male" is verified, not assumed.
 *
 *   yarn narration:voices            # check the configured voice/model/quota
 *   yarn narration:voices --list     # ...and print every voice on the account
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { buildIndex, loadDeck } from './narration-lib.mjs'

const run = promisify(execFile)

const API = 'https://api.elevenlabs.io'
const { ELEVENLABS_API_KEY } = process.env
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'cjVigY5qzO86Huf0OWal'
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_v3'
const STABILITY = Number(process.env.ELEVENLABS_STABILITY ?? 0.5)
const PACE = Number(process.env.NARRATION_PACE ?? 1.2)
const list = process.argv.includes('--list')

if (!ELEVENLABS_API_KEY) {
  console.error('narration-voices: ELEVENLABS_API_KEY is not set — add it to .env (see .env.example)')
  process.exit(1)
}

async function elevenlabs(path) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'xi-api-key': ELEVENLABS_API_KEY, Accept: 'application/json' },
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(`GET ${path} -> ${response.status} ${JSON.stringify(payload?.detail ?? payload)}`)
  }
  return payload
}

let ok = true

if (list) {
  const { voices } = await elevenlabs('/v1/voices')
  for (const voice of voices ?? []) {
    const labels = Object.values(voice.labels ?? {}).filter(Boolean).join(', ')
    console.log(`  ${voice.voice_id}  ${voice.name ?? ''}${labels ? `  (${labels})` : ''}`)
  }
  console.log(`\n${voices?.length ?? 0} voices on the account.\n`)
}

try {
  const voice = await elevenlabs(`/v1/voices/${VOICE_ID}`)
  const labels = Object.values(voice.labels ?? {}).filter(Boolean).join(', ')
  console.log(`✓ voice ${VOICE_ID} — ${voice.name ?? 'unnamed'}${labels ? ` (${labels})` : ''}`)
} catch (error) {
  console.error(`✗ voice ${VOICE_ID} does not resolve — ${error.message}`)
  console.error('  Run with --list to pick one.')
  ok = false
}

try {
  const models = await elevenlabs('/v1/models')
  const model = models.find?.(m => m.model_id === MODEL_ID)
  if (model) {
    console.log(`✓ model ${MODEL_ID} — ${model.name ?? ''}`)
  } else {
    console.error(`✗ model ${MODEL_ID} is not available on this account`)
    ok = false
  }
} catch (error) {
  console.warn(`? could not list models — ${error.message}`)
}

if (MODEL_ID.startsWith('eleven_v3') && ![0, 0.5, 1].includes(STABILITY)) {
  console.error(`✗ ELEVENLABS_STABILITY=${STABILITY} — eleven_v3 accepts only 0.0 (Creative), 0.5 (Natural) or 1.0 (Robust)`)
  ok = false
}

// Synthesis is billed per character. Sizing the whole deck against the quota
// here beats discovering an exhausted plan halfway through a build (the run
// saves progress and resumes, but the deck stays half old voice, half new).
try {
  const { entries, problems } = await buildIndex(await loadDeck())
  if (problems.length) {
    console.warn(`? narration is out of sync with the deck — character estimate skipped`)
  } else {
    const characters = entries.reduce((sum, entry) => sum + entry.text.length, 0)
    const subscription = await elevenlabs('/v1/user/subscription')
    const remaining = subscription.character_limit - subscription.character_count
    const enough = remaining >= characters
    console.log(
      `${enough ? '✓' : '✗'} quota — a full rebuild is ~${characters.toLocaleString('en-US')} characters, ` +
        `${remaining.toLocaleString('en-US')} remaining on the ${subscription.tier ?? '?'} plan`,
    )
    if (!enough) ok = false
  }
} catch (error) {
  console.warn(`? could not read the subscription quota — ${error.message}`)
}

if (PACE !== 1) {
  try {
    await run('ffmpeg', ['-version'])
    console.log(`✓ ffmpeg on PATH — NARRATION_PACE=${PACE} will be applied with atempo`)
  } catch {
    console.error(`✗ NARRATION_PACE=${PACE} needs ffmpeg on PATH, and it is missing`)
    ok = false
  }
}

process.exit(ok ? 0 : 1)
