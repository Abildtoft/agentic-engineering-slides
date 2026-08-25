import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { afterEach, beforeEach, test } from 'node:test'
import vm from 'node:vm'

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

function unlockRequestWithDigits(digits, next = '/') {
  const body = new URLSearchParams({ next })
  for (const digit of digits)
    body.append('pin-digit', digit)

  return new Request('https://slides.example.com/_deck-access', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })
}

function otpScript(body) {
  const script = body.match(/<script nonce="[A-Za-z0-9_-]+">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script)
  return script
}

function createOtpHarness(script, length) {
  let activeIndex = -1
  let selectedIndex = -1
  const handlers = {}
  const fields = Array.from({ length }, (_, index) => ({
    value: '',
    focus() {
      activeIndex = index
    },
    select() {
      selectedIndex = index
    },
  }))
  const submit = { disabled: false }
  const group = {
    addEventListener(type, handler) {
      handlers[type] = handler
    },
    querySelectorAll() {
      return fields
    },
  }
  const document = {
    querySelector(selector) {
      if (selector === '[data-otp]') return group
      if (selector === '[data-submit]') return submit
      return null
    },
  }

  vm.runInNewContext(script, { document })

  return {
    fields,
    submit,
    get activeIndex() {
      return activeIndex
    },
    get selectedIndex() {
      return selectedIndex
    },
    dispatch(type, index, properties = {}) {
      const event = {
        target: fields[index],
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true
        },
        ...properties,
      }
      handlers[type](event)
      return event
    },
  }
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

test('renders an accessible OTP control for a numeric PIN', async () => {
  const response = await pinGate(new Request('https://slides.example.com/'))
  const body = await response.text()
  const nonce = body.match(/<script nonce="([A-Za-z0-9_-]+)">/)?.[1]

  assert.equal(body.match(/name="pin-digit"/g)?.length, 6)
  assert.equal(body.match(/name="pin-digit"\s+type="password"/g)?.length, 6)
  assert.match(body, /pattern="\[0-9\]\{1,6\}"\s+maxlength="6"/)
  assert.equal(body.match(/maxlength="1"/g)?.length, 5)
  assert.match(body, /aria-label="6-digit PIN"/)
  assert.match(body, /aria-label="Digit 1 of 6"/)
  assert.match(body, /autocomplete="one-time-code" autofocus/)
  assert.match(body, /enterkeyhint="done"/)
  assert.doesNotMatch(body, /246810/)
  assert.ok(nonce)
  assert.match(response.headers.get('content-security-policy'), new RegExp(`script-src 'nonce-${nonce}'`))
  assert.doesNotMatch(response.headers.get('content-security-policy'), /script-src 'unsafe-inline'/)
})

test('segments only numeric PINs from four through eight digits', async () => {
  const cases = [
    ['1234', 4],
    ['12345678', 8],
    ['123', 0],
    ['123456789', 0],
  ]

  for (const [pin, expectedFields] of cases) {
    process.env.DECK_ACCESS_PIN = pin
    const response = await pinGate(new Request('https://slides.example.com/'))
    const body = await response.text()

    assert.equal(body.match(/name="pin-digit"/g)?.length ?? 0, expectedFields)
    if (expectedFields === 0)
      assert.match(body, /name="pin" type="password"/)
  }
})

test('runs the segmented OTP interactions', async () => {
  const response = await pinGate(new Request('https://slides.example.com/'))
  const harness = createOtpHarness(otpScript(await response.text()), 6)

  assert.equal(harness.submit.disabled, true)

  harness.fields[0].value = '2'
  harness.dispatch('input', 0)
  assert.equal(harness.activeIndex, 1)

  for (const field of harness.fields)
    field.value = ''

  harness.fields[0].value = '246810'
  harness.dispatch('input', 0)
  assert.deepEqual(harness.fields.map(field => field.value), [...'246810'])
  assert.equal(harness.activeIndex, 5)
  assert.equal(harness.submit.disabled, false)

  for (const field of harness.fields)
    field.value = ''

  const paste = harness.dispatch('paste', 0, {
    clipboardData: { getData: () => '246810' },
  })
  assert.equal(paste.defaultPrevented, true)
  assert.deepEqual(harness.fields.map(field => field.value), [...'246810'])
  assert.equal(harness.activeIndex, 5)
  assert.equal(harness.submit.disabled, false)

  harness.fields[5].value = ''
  const backspace = harness.dispatch('keydown', 5, { key: 'Backspace' })
  assert.equal(backspace.defaultPrevented, true)
  assert.equal(harness.fields[4].value, '')
  assert.equal(harness.activeIndex, 4)
  assert.equal(harness.submit.disabled, true)

  for (const [key, index, expectedIndex] of [
    ['ArrowLeft', 4, 3],
    ['ArrowRight', 3, 4],
    ['Home', 4, 0],
    ['End', 0, 5],
  ]) {
    const event = harness.dispatch('keydown', index, { key })
    assert.equal(event.defaultPrevented, true)
    assert.equal(harness.activeIndex, expectedIndex)
    assert.equal(harness.selectedIndex, expectedIndex)
  }

  harness.dispatch('focusin', 2)
  assert.equal(harness.selectedIndex, 2)
})

test('accepts the segmented OTP fields', async () => {
  const response = await pinGate(unlockRequestWithDigits('246810', '/4?auto=0'))

  assert.equal(response.status, 303)
  assert.equal(response.headers.get('location'), 'https://slides.example.com/4?auto=0')
})

test('rejects an incorrect PIN without setting a cookie', async () => {
  const response = await pinGate(unlockRequest('111111', '/4'))

  assert.equal(response.status, 401)
  assert.equal(response.headers.get('set-cookie'), null)
  const body = await response.text()
  assert.match(body, /PIN was not recognised/)
  assert.equal(body.match(/aria-invalid="true"\s+autocomplete=/g)?.length, 6)
})

test('falls back to a password field for a non-numeric access code', async () => {
  process.env.DECK_ACCESS_PIN = 'open-sesame'

  const gateResponse = await pinGate(new Request('https://slides.example.com/'))
  const body = await gateResponse.text()
  const unlockResponse = await pinGate(unlockRequest('open-sesame'))

  assert.doesNotMatch(body, /name="pin-digit"/)
  assert.match(body, /name="pin" type="password"/)
  assert.equal(unlockResponse.status, 303)
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
