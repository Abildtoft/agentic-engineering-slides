/**
 * Regenerates narration/*.md from the deck, preserving any prose already
 * written. Run it after adding, removing or reordering slides: the header
 * comments are rewritten from the current deck, and existing prose stays with
 * the slide it was written for as long as the section's slide count is
 * unchanged. Where a section has gained or lost slides the prose is preserved
 * positionally and the run reports it, so the misalignment is visible in the
 * diff rather than at the podium.
 *
 * Nothing here talks to any API — it is a local, offline scaffold.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { NARRATION_DIR, formatNarrationFile, groupSlides, loadDeck, parseNarrationFile } from './narration-lib.mjs'

const data = await loadDeck()
const groups = groupSlides(data)

await mkdir(NARRATION_DIR, { recursive: true })

for (const [file, slides] of groups) {
  const path = join(NARRATION_DIR, `${file}.md`)
  const existing = await readFile(path, 'utf-8').catch(() => null)
  const blocks = existing ? parseNarrationFile(existing) : []

  if (existing && blocks.length !== slides.length) {
    console.warn(
      `! ${file}.md: ${blocks.length} narration blocks vs ${slides.length} slides — ` +
        `prose kept in order; check the tail of this file`,
    )
  }

  const proseByIndex = Object.fromEntries(slides.map((slide, i) => [slide.sourceIndex, blocks[i] ?? '']))
  await writeFile(path, formatNarrationFile(slides, proseByIndex))

  const written = slides.filter(s => proseByIndex[s.sourceIndex]).length
  console.log(`  ${file}.md  ${String(written).padStart(2)}/${slides.length} slides narrated`)
}

const total = [...groups.values()].flat().length
console.log(`\n${total} slides across ${groups.size} narration files.`)
