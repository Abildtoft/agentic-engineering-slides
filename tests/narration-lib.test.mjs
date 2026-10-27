import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCaptions, captionsFor, resolveCues, scaleWordTimes, wordsFromAlignment } from '../scripts/narration-lib.mjs'

test('wordsFromAlignment groups characters into whitespace-separated words', () => {
  const text = 'One  2026\nthree.'
  const characters = [...text]
  const alignment = {
    characters,
    character_start_times_seconds: characters.map((_, i) => i * 0.25),
    character_end_times_seconds: characters.map((_, i) => i * 0.25 + 0.25),
  }

  const words = wordsFromAlignment(alignment)

  // Same tokenisation resolveCues counts with (\S+ runs): "2026" is one word,
  // consecutive whitespace collapses, and each word spans its own characters.
  assert.deepEqual(words, [
    { word: 'One', start: 0, end: 0.75 },
    { word: '2026', start: 1.25, end: 2.25 },
    { word: 'three.', start: 2.5, end: 4 },
  ])
})

test('scaleWordTimes divides timings by the pace factor', () => {
  const words = [{ word: 'One', start: 1, end: 2 }]
  assert.deepEqual(scaleWordTimes(words, 2), [{ word: 'One', start: 0.5, end: 1 }])
  assert.equal(scaleWordTimes(words, 1), words)
})

test('buildCaptions strips click markers and follows exact word timings', () => {
  const words = [
    { word: '<start>', start: 0, end: 0 },
    ...'One two three four five. Six seven eight nine ten.'
      .split(' ')
      .map((word, index) => ({ word, start: index * 0.5, end: index * 0.5 + 0.4 })),
    { word: '<end>', start: 5, end: 5 },
  ]

  const captions = buildCaptions('One two [click] three four five. Six seven eight nine ten.', words, 5)

  assert.deepEqual(captions, [
    { start: 0, end: 2.4, text: 'One two three four five.' },
    { start: 2.5, end: 5, text: 'Six seven eight nine ten.' },
  ])
})

test('buildCaptions distributes cached prose deterministically across duration', () => {
  const captions = buildCaptions('One two three four five. Six seven eight nine ten.', null, 20)

  assert.equal(captions.length, 2)
  assert.deepEqual(captions.map(caption => [caption.start, caption.end]), [[0, 10], [10, 20]])
  assert.equal(captions.map(caption => caption.text).join(' '), 'One two three four five. Six seven eight nine ten.')
})

test('captionsFor keeps voice-timed captions on reuse and rebuilds them when the prose changes', () => {
  const text = 'One two three four five. Six seven eight nine ten.'
  const words = text.split(' ').map((word, index) => ({ word, start: index * 0.4, end: index * 0.4 + 0.3 }))
  const timed = buildCaptions(text, words, 5)
  const previous = { transcript: text, captions: timed }

  // A reused entry has no word timings; recomputing would swap the voice-timed
  // set for the even-spaced fallback.
  assert.equal(captionsFor(previous, text, null, 5), timed)
  assert.notDeepEqual(buildCaptions(text, null, 5), timed)

  const revised = 'One two three four five.'
  assert.deepEqual(captionsFor(previous, revised, null, 5), buildCaptions(revised, null, 5))
  assert.deepEqual(captionsFor({ transcript: text }, text, null, 5), buildCaptions(text, null, 5))
  assert.deepEqual(captionsFor(previous, text, words, 5), timed)
})

test('resolveCues ignores HeyGen sentinel timestamps', () => {
  const words = [
    { word: '<start>', start: 0, end: 0 },
    { word: 'One', start: 0.2, end: 0.5 },
    { word: 'two', start: 0.6, end: 0.9 },
    { word: 'three', start: 1, end: 1.3 },
    { word: '<end>', start: 1.4, end: 1.4 },
  ]

  assert.deepEqual(resolveCues(['One', 'two three'], words, 1.4), { cues: [0.35], estimated: false })
})
