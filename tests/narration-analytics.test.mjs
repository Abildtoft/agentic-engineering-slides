import assert from 'node:assert/strict'
import test from 'node:test'

import { createAnalyticsBuffer, elapsedSecondsSince } from '../utils/analytics.mjs'

test('analytics events queue until PostHog is configured, then capture directly', () => {
  const analytics = createAnalyticsBuffer()
  const captured = []

  analytics.capture('narration_started', { slide_number: 1 })
  analytics.configure((event, properties) => captured.push({ event, properties }))
  analytics.capture('captions_toggled', { enabled: true })

  assert.deepEqual(captured, [
    { event: 'narration_started', properties: { slide_number: 1 } },
    { event: 'captions_toggled', properties: { enabled: true } },
  ])
})

test('disabling analytics clears queued events and ignores later events', () => {
  const analytics = createAnalyticsBuffer()
  const captured = []

  analytics.capture('narration_started')
  analytics.disable()
  analytics.configure((event, properties) => captured.push({ event, properties }))
  analytics.capture('talk_completed')

  assert.deepEqual(captured, [])
})

test('analytics handler failures do not escape and disable later captures', () => {
  const analytics = createAnalyticsBuffer()
  const originalWarn = console.warn
  const warnings = []
  console.warn = (...args) => warnings.push(args)

  try {
    analytics.configure(() => {
      throw new Error('capture failed')
    })

    assert.doesNotThrow(() => analytics.capture('narration_started'))

    const captured = []
    analytics.configure((event) => captured.push(event))
    analytics.capture('talk_completed')

    assert.deepEqual(captured, [])
    assert.equal(warnings.length, 1)
  } finally {
    console.warn = originalWarn
  }
})

test('queued analytics handler failures do not escape and discard the remaining queue', () => {
  const analytics = createAnalyticsBuffer()
  const originalWarn = console.warn
  const warnings = []
  console.warn = (...args) => warnings.push(args)

  try {
    analytics.capture('narration_started')
    analytics.capture('captions_toggled')

    assert.doesNotThrow(() => analytics.configure(() => {
      throw new Error('capture failed')
    }))

    const captured = []
    analytics.configure((event) => captured.push(event))
    analytics.capture('talk_completed')

    assert.deepEqual(captured, [])
    assert.equal(warnings.length, 1)
  } finally {
    console.warn = originalWarn
  }
})

test('elapsedSecondsSince distinguishes no timer, partial time, and a completed break', () => {
  const startedAt = 10_000

  assert.equal(elapsedSecondsSince(null, 310_000, 300), 0)
  assert.equal(elapsedSecondsSince(startedAt, 132_999, 300), 122)
  assert.equal(elapsedSecondsSince(startedAt, 310_000, 300), 300)
  assert.equal(elapsedSecondsSince(startedAt, 410_000, 300), 300)
})
