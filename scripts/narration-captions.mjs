/**
 * Adds transcripts and deterministic captions to the existing narration
 * manifest without calling the TTS API or touching media assets.
 *
 * Fresh synthesis writes captions from exact word timings. This command is the
 * zero-cost migration for cached clips built before captions existed.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ROOT, buildCaptions, buildIndex, loadDeck } from './narration-lib.mjs'

const manifestPath = join(ROOT, 'public', 'narration', 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'))
const { entries, problems } = await buildIndex(await loadDeck())

if (problems.length) {
  for (const problem of problems) console.error(`! ${problem}`)
  process.exitCode = 1
} else {
  let updated = 0
  for (const entry of entries) {
    const built = manifest.slides?.[entry.no]
    if (!built?.duration) continue
    manifest.slides[entry.no] = {
      ...built,
      transcript: entry.text,
      captions: buildCaptions(entry.text, null, built.duration),
    }
    updated++
  }
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`narration-captions: updated ${updated} slide(s) without synthesis`)
}
