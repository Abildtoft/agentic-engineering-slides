/**
 * Preflight for `yarn narration:build`. Confirms the key works, and that the
 * configured voice and avatar both exist and are usable.
 *
 * The voice check is the one that earns its keep. Cue timing depends entirely
 * on `word_timestamps`, which /v3/voices/speech only returns for voices on the
 * Starfish engine — anything else synthesises perfectly well and returns null
 * there, so the build silently falls back to spacing cues evenly through the
 * clip. That failure looks like success right up until the reveals drift away
 * from the voice on stage. Cheaper to catch it here than to re-render an hour
 * of video afterwards.
 *
 *   yarn narration:voices            # check the configured IDs
 *   yarn narration:voices --list     # ...and print every Starfish voice
 *
 * Endpoints are v3 throughout. The v2/v1 equivalents still answer, but every
 * one of them returns a `warning` naming a 2026-10-31 sunset.
 */
const API = 'https://api.heygen.com'
const { HEYGEN_API_KEY, HEYGEN_VOICE_ID, HEYGEN_AVATAR_ID } = process.env
const list = process.argv.includes('--list')

if (!HEYGEN_API_KEY) {
  console.error('narration-voices: HEYGEN_API_KEY is not set — add it to .env (see .env.example)')
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
  // The whole envelope, not payload.data: v3 puts the page cursor
  // (`has_more` / `next_token`) as a sibling of `data`, so unwrapping here
  // would silently discard it and cap every listing at one page.
  return payload
}

const dataOf = payload => payload.data ?? payload

let ok = true

/**
 * /v3/voices returns 20 per page behind `has_more` / `next_token` — around 60
 * pages on this account. Reading only the first page reports almost every
 * compatible voice as incompatible, which is worse than not checking at all:
 * it sends you off to change a voice that was fine.
 */
async function allStarfishVoices() {
  const collected = []
  let token = null
  // A page cap rather than a bare `while (token)`: a server-side change that
  // stopped advancing the token would otherwise spin here forever.
  for (let page = 0; page < 200; page++) {
    const payload = await heygen(`/v3/voices?engine=starfish${token ? `&token=${encodeURIComponent(token)}` : ''}`)
    // `data` is the array itself on v3, but has been an object with a `voices`
    // key elsewhere in the API — accept either.
    const page_ = dataOf(payload)
    collected.push(...(Array.isArray(page_) ? page_ : (page_.voices ?? [])))
    token = payload.has_more ? payload.next_token : null
    if (!token) break
  }
  return collected
}

const starfish = await allStarfishVoices()

if (list) {
  for (const voice of starfish) {
    console.log(`  ${voice.voice_id}  ${voice.name ?? ''} ${voice.language ?? ''} ${voice.gender ?? ''}`.trimEnd())
  }
  console.log(`\n${starfish.length} Starfish voices.\n`)
}

const match = starfish.find(v => v.voice_id === HEYGEN_VOICE_ID)
if (!HEYGEN_VOICE_ID) {
  console.error('✗ HEYGEN_VOICE_ID is not set')
  ok = false
} else if (match) {
  console.log(`✓ voice ${HEYGEN_VOICE_ID} — ${match.name ?? 'unnamed'}, Starfish, word timings available`)
} else {
  console.error(
    `✗ voice ${HEYGEN_VOICE_ID} is not in the Starfish list.\n` +
      '  It may still synthesise, but /v3/voices/speech will return no word_timestamps,\n' +
      '  so every [click] cue would be spaced evenly instead of timed to the words.\n' +
      '  Run with --list to pick a compatible voice.',
  )
  ok = false
}

/**
 * Resolved by direct lookup rather than by scanning a listing.
 *
 * In v3 an "avatar" is a *group* and the id you pass to video generation is a
 * *look* inside it, so `/v3/avatars` (~1.4k groups) will never contain a usable
 * avatar_id and searching it reports valid avatars as missing.
 * `/v3/avatars/looks/{look_id}` answers the question directly in one request —
 * note the path, which is not the `/v3/avatars/{group_id}/looks/{look_id}` the
 * docs describe; that one 404s, and we'd need the group id we don't have.
 */
if (!HEYGEN_AVATAR_ID) {
  console.error('✗ HEYGEN_AVATAR_ID is not set')
  ok = false
} else {
  try {
    const look = dataOf(await heygen(`/v3/avatars/looks/${HEYGEN_AVATAR_ID}`))
    const detail = [look.gender, look.avatar_type, `${look.image_width}x${look.image_height}`]
      .filter(Boolean)
      .join(', ')
    console.log(`✓ avatar ${HEYGEN_AVATAR_ID} — ${look.name ?? 'unnamed'} (${detail})`)
    // A look can exist while its training is still running, in which case
    // generation fails later for a reason that has nothing to do with the
    // request.
    if (look.status && look.status !== 'completed') {
      console.error(`✗ avatar status is "${look.status}", not "completed" — generation will fail`)
      ok = false
    }
  } catch (error) {
    console.error(`✗ avatar ${HEYGEN_AVATAR_ID} does not resolve — ${error.message}`)
    ok = false
  }
}

// Rendering fails with a 402 rather than a validation error when the wallet is
// empty, which reads as a broken request unless you know to look here.
try {
  const me = dataOf(await heygen('/v3/users/me'))
  const balance = me.wallet?.remaining_balance
  if (typeof balance === 'number') {
    console.log(`${balance > 0 ? '✓' : '✗'} balance ${balance.toFixed(2)} ${(me.wallet.currency ?? '').toUpperCase()}`)
    if (balance <= 0) ok = false
  }
} catch (error) {
  console.warn(`? could not read the account balance — ${error.message}`)
}

process.exit(ok ? 0 : 1)
