import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { afterEach, beforeEach, test } from 'node:test'

import pinGate from '../middleware.js'

const ENVIRONMENT_KEYS = [
  'DECK_ACCESS_PIN',
  'DECK_COOKIE_SECRET',
  'DISABLE_PIN_GATE',
]

const COOKIE_SECRET = 'a-test-cookie-secret-that-is-at-least-32-characters'
const rootPackage = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
)
const mascotPackage = JSON.parse(
  await readFile(new URL('../scripts/mascot-render/package.json', import.meta.url), 'utf8'),
)

beforeEach(() => {
  process.env.DECK_ACCESS_PIN = '246810'
  process.env.DECK_COOKIE_SECRET = COOKIE_SECRET
  delete process.env.DISABLE_PIN_GATE
})

afterEach(() => {
  for (const key of ENVIRONMENT_KEYS)
    delete process.env[key]
})

function unlockRequest(pin, next = '/') {
  return new Request('https://slides.example.com/_deck-access', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ pin, next }),
  })
}

test('fails closed when the gate is not configured', async () => {
  delete process.env.DECK_COOKIE_SECRET

  const response = await pinGate(new Request('https://slides.example.com/'))

  assert.equal(response.status, 503)
  assert.match(await response.text(), /access gate has not been configured/i)
})

test('shows the unlock page and preserves the requested deck route', async () => {
  const response = await pinGate(
    new Request('https://slides.example.com/17?auto=0&view=presenter'),
  )
  const body = await response.text()

  assert.equal(response.status, 401)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.match(body, /Enter the access PIN/)
  assert.match(body, /value="\/17\?auto=0&amp;view=presenter"/)
})

test('rejects an incorrect PIN without setting a cookie', async () => {
  const response = await pinGate(unlockRequest('111111', '/4'))

  assert.equal(response.status, 401)
  assert.equal(response.headers.get('set-cookie'), null)
  assert.match(await response.text(), /PIN was not recognised/)
})

test('sets a signed secure cookie and redirects after a correct PIN', async () => {
  const response = await pinGate(unlockRequest('246810', '/4?auto=0'))
  const cookie = response.headers.get('set-cookie')

  assert.equal(response.status, 303)
  assert.equal(response.headers.get('location'), 'https://slides.example.com/4?auto=0')
  assert.match(cookie, /^deck_access=v1\.[0-9]+\.[A-Za-z0-9_-]+;/)
  assert.match(cookie, /HttpOnly/)
  assert.match(cookie, /Secure/)
  assert.match(cookie, /SameSite=Lax/)
  assert.match(cookie, /Max-Age=604800/)
  assert.doesNotMatch(cookie, /246810/)
})

test('allows requests carrying a valid session cookie', async () => {
  const unlockResponse = await pinGate(unlockRequest('246810'))
  const cookie = unlockResponse.headers.get('set-cookie').split(';', 1)[0]
  const response = await pinGate(new Request('https://slides.example.com/assets/deck.js', {
    headers: { cookie },
  }))

  assert.equal(response, undefined)
})

test('rejects a tampered session cookie', async () => {
  const unlockResponse = await pinGate(unlockRequest('246810'))
  const cookie = unlockResponse.headers.get('set-cookie').split(';', 1)[0]
  const response = await pinGate(new Request('https://slides.example.com/', {
    headers: { cookie: `${cookie}tampered` },
  }))

  assert.equal(response.status, 401)
})

test('rejects an expired session cookie', async () => {
  const originalDateNow = Date.now
  const unlockResponse = await pinGate(unlockRequest('246810'))
  const cookie = unlockResponse.headers.get('set-cookie').split(';', 1)[0]
  const expiresAt = Number(cookie.split('.')[1])

  try {
    Date.now = () => expiresAt + 1
    const response = await pinGate(new Request('https://slides.example.com/', {
      headers: { cookie },
    }))

    assert.equal(response.status, 401)
  }
  finally {
    Date.now = originalDateNow
  }
})

test('rejects an existing session after the signing secret rotates', async () => {
  const unlockResponse = await pinGate(unlockRequest('246810'))
  const cookie = unlockResponse.headers.get('set-cookie').split(';', 1)[0]
  process.env.DECK_COOKIE_SECRET = 'a-rotated-cookie-secret-that-is-at-least-32-characters'

  const response = await pinGate(new Request('https://slides.example.com/', {
    headers: { cookie },
  }))

  assert.equal(response.status, 401)
})

test('does not redirect to another origin after unlock', async () => {
  const response = await pinGate(unlockRequest('246810', '//attacker.example/path'))

  assert.equal(response.status, 303)
  assert.equal(response.headers.get('location'), 'https://slides.example.com/')
})

test('can be explicitly disabled', async () => {
  delete process.env.DECK_ACCESS_PIN
  delete process.env.DECK_COOKIE_SECRET
  process.env.DISABLE_PIN_GATE = 'true'

  const response = await pinGate(new Request('https://slides.example.com/'))

  assert.equal(response, undefined)
})

test('keeps the private Mascotbot SDK out of Vercel function packaging', () => {
  assert.equal(rootPackage.dependencies?.['@mascotbot/core'], undefined)
  assert.equal(rootPackage.devDependencies?.['@mascotbot/core'], undefined)
  assert.equal(mascotPackage.dependencies?.['@mascotbot/core'], '^0.3.1')
})
