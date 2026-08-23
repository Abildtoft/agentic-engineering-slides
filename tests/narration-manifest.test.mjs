import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ROOT, loadDeck } from '../scripts/narration-lib.mjs'

const narrationDir = join(ROOT, 'public', 'narration')
const manifest = JSON.parse(await readFile(join(narrationDir, 'manifest.json'), 'utf-8'))
const mascot = JSON.parse(await readFile(join(narrationDir, 'mascot.json'), 'utf-8'))

test('every narrated slide carries a bounded transcript and captions', () => {
  assert.equal(Object.keys(manifest.slides).length, 59)

  for (const [no, slide] of Object.entries(manifest.slides)) {
    assert.ok(slide.transcript, `slide ${no} has a transcript`)
    assert.ok(slide.captions.length, `slide ${no} has captions`)
    assert.equal(slide.captions.at(-1).end, Number(slide.duration.toFixed(3)), `slide ${no} captions reach the end`)

    let previousEnd = 0
    for (const caption of slide.captions) {
      assert.ok(caption.text.length > 0, `slide ${no} caption text is not empty`)
      assert.ok(caption.start >= previousEnd, `slide ${no} captions are ordered`)
      assert.ok(caption.end > caption.start, `slide ${no} caption has positive duration`)
      assert.ok(caption.end <= slide.duration + 0.001, `slide ${no} caption stays inside media`)
      previousEnd = caption.end
    }
  }
})

test('the optimized mascot manifest covers every speech source with a local asset', async () => {
  assert.equal(mascot.mascot.size, 512)
  assert.equal(mascot.mascot.fps, 24)
  assert.equal(Object.keys(mascot.slides).length, 59)

  for (const [no, clip] of Object.entries(mascot.slides)) {
    const speech = (manifest.slides[no].video ?? manifest.slides[no].audio).split('/').pop()
    assert.equal(clip.source, speech, `slide ${no} mascot matches current speech`)
    await access(join(narrationDir, clip.video.split('/').pop()))
  }
})

test('diagram slides hide the tile and the halfway slide owns an intermission', async () => {
  const deck = await loadDeck()
  const hidden = deck.slides.filter(slide => slide.frontmatter?.narrator === 'hidden').map(slide => slide.index + 1)
  const expected = [7, 8, 11, 15, 23, 24, 25, 26, 27, 28, 29, 36, 43, 46, 48, 50]

  assert.deepEqual(hidden, expected)
  assert.equal(deck.slides[29].frontmatter?.narrationPause, true)
})
