import test from 'node:test'
import assert from 'node:assert/strict'
import { relative } from 'node:path'
import { ROOT, loadDeck } from '../scripts/narration-lib.mjs'

const BRAND_HEADMATTER_KEYS = ['author', 'favicon', 'fonts', 'htmlAttrs']

function comparableSlide(slide) {
  const frontmatter = structuredClone(slide.frontmatter ?? {})
  if (slide.index === 0) {
    for (const key of BRAND_HEADMATTER_KEYS) delete frontmatter[key]
  }

  const source = relative(ROOT, slide.source.filepath)

  return {
    title: slide.title ?? '',
    content: slide.content,
    note: slide.note ?? '',
    frontmatter,
    source: /^slides(?:-melatech)?\.md$/.test(source) ? '<brand-entry>' : source,
  }
}

test('branded decks differ only in approved cover branding', async () => {
  const consensus = await loadDeck('slides.md')
  const melatech = await loadDeck('slides-melatech.md')

  assert.equal(melatech.slides.length, consensus.slides.length, 'both decks have the same slide count')

  for (let index = 0; index < consensus.slides.length; index += 1) {
    assert.deepEqual(
      comparableSlide(melatech.slides[index]),
      comparableSlide(consensus.slides[index]),
      `slide ${index + 1} stays identical across brands`,
    )
  }
})
