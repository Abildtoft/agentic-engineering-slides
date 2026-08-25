const COOKIE_NAME = 'deck_access'
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 7
const UNLOCK_PATH = '/_deck-access'

const encoder = new TextEncoder()

function isGateDisabled() {
  const value = process.env.DISABLE_PIN_GATE?.toLowerCase()
  return value === '1' || value === 'true'
}

function getGateConfig() {
  const pin = process.env.DECK_ACCESS_PIN
  const cookieSecret = process.env.DECK_COOKIE_SECRET

  if (!pin || !cookieSecret || cookieSecret.length < 32)
    return null

  return { pin, cookieSecret }
}

function bytesToBase64Url(bytes) {
  let binary = ''
  for (const byte of bytes)
    binary += String.fromCharCode(byte)

  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
}

function base64UrlToBytes(value) {
  try {
    const normalized = value.replaceAll('-', '+').replaceAll('_', '/')
    const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4)
    const binary = atob(padded)
    return Uint8Array.from(binary, character => character.charCodeAt(0))
  }
  catch {
    return null
  }
}

async function importSigningKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

async function pinMatches(submittedPin, expectedPin, secret) {
  const key = await importSigningKey(secret)
  const expectedSignature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`pin:${expectedPin}`),
  )

  return crypto.subtle.verify(
    'HMAC',
    key,
    expectedSignature,
    encoder.encode(`pin:${submittedPin}`),
  )
}

async function createSessionToken(secret, expiresAt) {
  const payload = `v1.${expiresAt}`
  const key = await importSigningKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`
}

async function isSessionTokenValid(token, secret) {
  if (!token)
    return false

  const [version, expiresAtText, signatureText, ...extra] = token.split('.')
  const expiresAt = Number(expiresAtText)
  const signature = base64UrlToBytes(signatureText ?? '')

  if (
    version !== 'v1'
    || extra.length > 0
    || !Number.isSafeInteger(expiresAt)
    || expiresAt <= Date.now()
    || !signature
  )
    return false

  const key = await importSigningKey(secret)
  return crypto.subtle.verify(
    'HMAC',
    key,
    signature,
    encoder.encode(`${version}.${expiresAt}`),
  )
}

function readCookie(request, name) {
  const cookieHeader = request.headers.get('cookie') ?? ''

  for (const part of cookieHeader.split(';')) {
    const separatorIndex = part.indexOf('=')
    if (separatorIndex < 0)
      continue

    const cookieName = part.slice(0, separatorIndex).trim()
    if (cookieName === name)
      return part.slice(separatorIndex + 1).trim()
  }

  return null
}

function safeReturnPath(candidate, origin) {
  if (
    typeof candidate !== 'string'
    || !candidate.startsWith('/')
    || candidate.startsWith('//')
  )
    return '/'

  try {
    const url = new URL(candidate, origin)
    if (url.origin !== origin || url.pathname === UNLOCK_PATH)
      return '/'

    return `${url.pathname}${url.search}${url.hash}`
  }
  catch {
    return '/'
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function otpFields(length, invalidPin) {
  return Array.from({ length }, (_, index) => {
    const isAutocompleteTarget = index === 0
    const pattern = isAutocompleteTarget ? `[0-9]{1,${length}}` : '[0-9]'
    const maxlength = isAutocompleteTarget ? length : 1

    return `
          <input
            class="otp-digit"
            data-otp-digit
            name="pin-digit"
            type="password"
            inputmode="numeric"
            pattern="${pattern}"
            maxlength="${maxlength}"
            aria-label="Digit ${index + 1} of ${length}"
            aria-invalid="${invalidPin}"
            ${isAutocompleteTarget ? 'autocomplete="one-time-code" autofocus' : 'autocomplete="off"'}
            ${index === length - 1 ? 'enterkeyhint="done"' : 'enterkeyhint="next"'}
            required
          >`
  }).join('')
}

function pinControl(pin, invalidPin) {
  if (!/^\d{4,8}$/.test(pin)) {
    return `<label for="pin">Access PIN</label>
        <input id="pin" name="pin" type="password" autocomplete="current-password" maxlength="128" aria-invalid="${invalidPin}" aria-describedby="pin-error" required autofocus>`
  }

  return `<fieldset class="otp-fieldset" aria-describedby="pin-hint pin-error">
        <legend>Access PIN</legend>
        <p id="pin-hint" class="sr-only">Enter all ${pin.length} digits.</p>
        <div class="otp" data-otp role="group" aria-label="${pin.length}-digit PIN" style="--otp-length: ${pin.length}">
          ${otpFields(pin.length, invalidPin)}
        </div>
      </fieldset>`
}

function accessPage(returnPath, config, nonce, invalidPin = false) {
  const errorMessage = invalidPin
    ? 'That PIN was not recognised. Try again.'
    : ''

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Private presentation</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #002353;
        background: #f4f7fa;
      }
      * { box-sizing: border-box; }
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        background:
          radial-gradient(circle at 15% 10%, rgb(83 150 199 / 18%), transparent 35rem),
          #f4f7fa;
      }
      main {
        width: min(100%, 25rem);
        padding: 2.5rem;
        border: 1px solid rgb(0 35 83 / 12%);
        border-radius: 1.25rem;
        background: rgb(255 255 255 / 94%);
        box-shadow: 0 1.5rem 4rem rgb(0 35 83 / 12%);
      }
      .eyebrow {
        margin: 0 0 0.75rem;
        color: #3f7daa;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: clamp(1.75rem, 7vw, 2.25rem);
        line-height: 1.08;
      }
      .intro {
        margin: 0.85rem 0 1.75rem;
        color: #4b5f78;
        line-height: 1.55;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 700;
      }
      input:not(.otp-digit) {
        width: 100%;
        min-height: 3.25rem;
        padding: 0.75rem 1rem;
        border: 1px solid #9aabbd;
        border-radius: 0.65rem;
        color: #002353;
        background: white;
        font: inherit;
        font-size: 1.2rem;
        letter-spacing: 0.12em;
      }
      input:not(.otp-digit):focus {
        border-color: #397da9;
        outline: 3px solid rgb(83 150 199 / 24%);
      }
      .otp-fieldset {
        min-width: 0;
        margin: 0;
        padding: 0;
        border: 0;
      }
      .otp-fieldset legend {
        margin-bottom: 0.65rem;
        padding: 0;
        font-size: 0.875rem;
        font-weight: 700;
      }
      .otp {
        display: grid;
        grid-template-columns: repeat(var(--otp-length), minmax(0, 1fr));
        gap: clamp(0.35rem, 2vw, 0.6rem);
      }
      .otp-digit {
        width: 100%;
        min-width: 0;
        aspect-ratio: 0.85;
        border: 1px solid #9aabbd;
        border-radius: 0.65rem;
        color: #002353;
        background: white;
        font: inherit;
        font-size: clamp(1.35rem, 7vw, 1.75rem);
        font-variant-numeric: tabular-nums;
        font-weight: 650;
        line-height: 1;
        text-align: center;
        caret-color: #397da9;
      }
      .otp-digit:hover { border-color: #6f879e; }
      .otp-digit:focus {
        border-color: #397da9;
        outline: 3px solid rgb(83 150 199 / 24%);
      }
      .otp-digit[aria-invalid="true"] { border-color: #b95050; }
      .otp-digit[aria-invalid="true"]:focus { outline-color: rgb(185 80 80 / 22%); }
      button {
        width: 100%;
        min-height: 3.25rem;
        margin-top: 0.9rem;
        border: 0;
        border-radius: 0.65rem;
        color: white;
        background: #002353;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }
      button:hover { background: #083b73; }
      button:focus-visible { outline: 3px solid rgb(83 150 199 / 55%); outline-offset: 3px; }
      button:disabled { cursor: not-allowed; opacity: 0.52; }
      .error { margin: 0 0 1rem; color: #a52b2b; font-size: 0.875rem; }
      .error:empty { display: none; }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media (max-width: 26rem) {
        main { padding: 1.75rem; }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Private presentation</p>
      <h1>Enter the access PIN</h1>
      <p class="intro">This presentation is shared with a limited audience.</p>
      <p id="pin-error" class="error" role="alert">${errorMessage}</p>
      <form method="post" action="${UNLOCK_PATH}" data-pin-form>
        <input type="hidden" name="next" value="${escapeHtml(returnPath)}">
        ${pinControl(config.pin, invalidPin)}
        <button type="submit" data-submit>Open presentation</button>
      </form>
    </main>
    <script nonce="${nonce}">
      (() => {
        const group = document.querySelector('[data-otp]')
        if (!group) return

        const fields = [...group.querySelectorAll('[data-otp-digit]')]
        const submit = document.querySelector('[data-submit]')
        const digitsOnly = value => value.replace(/\\D/g, '')

        function updateSubmit() {
          submit.disabled = fields.some(field => !field.value)
        }

        function focusField(index) {
          const field = fields[Math.max(0, Math.min(index, fields.length - 1))]
          field.focus()
          field.select()
        }

        function insertDigits(startIndex, value) {
          const digits = digitsOnly(value)
          if (!digits) return

          for (let offset = 0; offset < digits.length && startIndex + offset < fields.length; offset++)
            fields[startIndex + offset].value = digits[offset]

          const nextEmpty = fields.findIndex((field, index) => index >= startIndex && !field.value)
          focusField(nextEmpty >= 0 ? nextEmpty : Math.min(startIndex + digits.length, fields.length - 1))
          updateSubmit()
        }

        group.addEventListener('input', (event) => {
          const index = fields.indexOf(event.target)
          if (index < 0) return

          const digits = digitsOnly(event.target.value)
          event.target.value = digits[0] || ''

          if (digits.length > 1)
            insertDigits(index, digits)
          else if (digits && index < fields.length - 1)
            focusField(index + 1)

          updateSubmit()
        })

        group.addEventListener('paste', (event) => {
          const index = fields.indexOf(event.target)
          if (index < 0) return

          const digits = digitsOnly(event.clipboardData.getData('text'))
          if (!digits) return

          event.preventDefault()
          insertDigits(index, digits)
        })

        group.addEventListener('keydown', (event) => {
          const index = fields.indexOf(event.target)
          if (index < 0) return

          if (event.key === 'Backspace' && !event.target.value && index > 0) {
            event.preventDefault()
            fields[index - 1].value = ''
            focusField(index - 1)
            updateSubmit()
          }
          else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            focusField(index - 1)
          }
          else if (event.key === 'ArrowRight') {
            event.preventDefault()
            focusField(index + 1)
          }
          else if (event.key === 'Home') {
            event.preventDefault()
            focusField(0)
          }
          else if (event.key === 'End') {
            event.preventDefault()
            focusField(fields.length - 1)
          }
        })

        group.addEventListener('focusin', (event) => {
          if (fields.includes(event.target)) event.target.select()
        })

        updateSubmit()
      })()
    </script>
  </body>
</html>`
}

function htmlResponse(body, status, nonce = null) {
  const scriptPolicy = nonce ? `; script-src 'nonce-${nonce}'` : ''

  return new Response(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': `default-src 'none'; style-src 'unsafe-inline'${scriptPolicy}; form-action 'self'; base-uri 'none'; frame-ancestors 'none'`,
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
  })
}

function accessResponse(returnPath, config, invalidPin = false, status = 401) {
  const nonce = bytesToBase64Url(crypto.getRandomValues(new Uint8Array(16)))
  return htmlResponse(accessPage(returnPath, config, nonce, invalidPin), status, nonce)
}

function readSubmittedPin(form) {
  const directPin = form.get('pin')
  if (typeof directPin === 'string')
    return directPin

  const pinDigits = form.getAll('pin-digit')
  if (pinDigits.length === 0 || !pinDigits.every(digit => typeof digit === 'string'))
    return null

  return pinDigits.join('')
}

function configurationErrorResponse() {
  return htmlResponse(
    '<!doctype html><html lang="en"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex"><title>Presentation unavailable</title><body><main><h1>Presentation unavailable</h1><p>The access gate has not been configured.</p></main></body></html>',
    503,
  )
}

async function unlock(request, config) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.startsWith('application/x-www-form-urlencoded'))
    return new Response('Unsupported media type', {
      status: 415,
      headers: { 'Cache-Control': 'no-store' },
    })

  let form
  try {
    form = await request.formData()
  }
  catch {
    return accessResponse('/', config, true, 400)
  }

  const submittedPin = readSubmittedPin(form)
  const url = new URL(request.url)
  const returnPath = safeReturnPath(form.get('next'), url.origin)

  if (
    typeof submittedPin !== 'string'
    || !(await pinMatches(submittedPin, config.pin, config.cookieSecret))
  )
    return accessResponse(returnPath, config, true)

  const expiresAt = Date.now() + COOKIE_TTL_SECONDS * 1000
  const token = await createSessionToken(config.cookieSecret, expiresAt)
  const location = new URL(returnPath, url.origin).toString()

  return new Response(null, {
    status: 303,
    headers: {
      'Cache-Control': 'no-store',
      'Location': location,
      'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
    },
  })
}

export const config = {
  matcher: '/:path*',
}

export default async function pinGate(request) {
  if (isGateDisabled())
    return undefined

  const gateConfig = getGateConfig()
  if (!gateConfig)
    return configurationErrorResponse()

  const url = new URL(request.url)

  if (url.pathname === UNLOCK_PATH) {
    if (request.method !== 'POST')
      return Response.redirect(new URL('/', url.origin), 303)

    return unlock(request, gateConfig)
  }

  const sessionToken = readCookie(request, COOKIE_NAME)
  if (await isSessionTokenValid(sessionToken, gateConfig.cookieSecret))
    return undefined

  const returnPath = safeReturnPath(`${url.pathname}${url.search}`, url.origin)
  return accessResponse(returnPath, gateConfig)
}
