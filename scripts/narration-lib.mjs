import { readFile, readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { load } from '@slidev/parser/fs'

export const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
export const NARRATION_DIR = join(ROOT, 'narration')

/** slides.md's own three slides have no section file of their own. */
const ENTRY_NARRATION_FILE = '00-intro'

/**
 * Narration is keyed by (source file, index within that file) rather than by
 * deck-wide slide number. Slide numbers shift whenever a slide is inserted
 * anywhere earlier in the deck, which would silently re-point every downstream
 * line onto the wrong slide — the failure mode is a talk that narrates slide 40
 * over slide 39 and nobody notices until it's on stage. The file-relative key
 * only moves when its own section is edited, and buildIndex() hard-errors on a
 * count mismatch rather than guessing an alignment.
 */
export function narrationFileFor(slide) {
  const file = basename(slide.source.filepath, '.md')
  return file === 'slides' || file === 'slides-melatech' ? ENTRY_NARRATION_FILE : file
}

export async function loadDeck(entry = 'slides.md') {
  return load(ROOT, join(ROOT, entry))
}

/**
 * Groups the parsed deck into the narration file layout: one entry per
 * narration file, slides in source order, each carrying its deck-wide number so
 * the built manifest can key on what the player actually sees at runtime.
 */
export function groupSlides(data) {
  const groups = new Map()
  for (const slide of data.slides) {
    const file = narrationFileFor(slide)
    if (!groups.has(file)) groups.set(file, [])
    groups.get(file).push({
      file,
      sourceIndex: slide.source.index,
      no: slide.index + 1,
      layout: slide.frontmatter?.layout ?? (slide.index === 0 ? 'cover' : 'default'),
      title: slide.title ?? '',
      note: slide.note ?? '',
      approxClicks: approximateClicks(slide),
    })
  }
  return groups
}

/**
 * How many click steps a slide is likely to have.
 *
 * Deliberately "likely": a v-click count is only authoritative at runtime —
 * Slidev resolves `v-clicks` over a list into one step per child, and a
 * component driving its build from `$clicks` declares a count this can't see
 * unless it's in frontmatter. So this is guidance for the person writing the
 * narration, never a constraint. The player reconciles against the real
 * `clicksTotal` when the slide is actually on screen, and tolerates being wrong
 * in either direction.
 */
function approximateClicks(slide) {
  if (slide.frontmatter?.clicks != null) return Number(slide.frontmatter.clicks)
  const content = slide.content
  const opens = (content.match(/<v-clicks?[\s>]/g) || []).length
  const attrs = (content.match(/\sv-clicks?[=\s>]/g) || []).length
  return opens + attrs
}

const BLOCK_SEPARATOR = /^---$/m

/** The header line carries only guidance — it's regenerated on every scaffold
    run, so nothing downstream may depend on the text inside it. */
export const headerFor = slide =>
  `<!-- ${slide.no}. ${slide.layout}${slide.title ? ` — ${slide.title}` : ''}` +
  `${slide.approxClicks ? ` — ~${slide.approxClicks} clicks` : ''} -->`

/** Splits a narration file into per-slide prose, dropping the regenerated
    header comments. Order is the contract; an empty block means "stay silent
    on this slide", which is a legitimate choice for a section divider. */
export function parseNarrationFile(text) {
  return text
    .split(BLOCK_SEPARATOR)
    .map(block => block.replace(/<!--[\s\S]*?-->/g, '').trim())
}

export function formatNarrationFile(slides, proseByIndex) {
  return `${slides
    .map(slide => {
      const prose = proseByIndex[slide.sourceIndex] ?? ''
      return `${headerFor(slide)}\n\n${prose}\n`
    })
    .join('\n---\n\n')}`
}

/** Cue markers are stripped before synthesis and their positions recorded, so
    the avatar never says the word "click". */
export const CUE_MARKER = /\[click\]/g

export function splitCues(prose) {
  const segments = prose.split(CUE_MARKER).map(s => s.trim())
  return { text: segments.filter(Boolean).join(' '), segments }
}

/** A reveal reads better if it has already started moving as the words that
    describe it arrive, so cues fire slightly ahead of the phrase. Roughly one
    --motion-base (280ms), rounded to where speech timing is actually accurate. */
export const CUE_LEAD_SECONDS = 0.25

/**
 * Resolves each [click] marker to a time by counting words into HeyGen's
 * word_timestamps.
 *
 * The two tokenisations only have to agree on *count*, not on spelling — the
 * words themselves are never compared, because the synthesiser normalises them
 * ("2026" spoken as three words, "MCP" as three letters) and a string match
 * would desynchronise the moment it hit one. Counting survives that as long as
 * the prose avoids constructs that expand; where it doesn't, the caller is told
 * via `estimated` and cues fall back to even spacing — wrong by a fraction of a
 * second rather than by a whole slide.
 */
export function resolveCues(segments, wordTimestamps, duration) {
  // HeyGen brackets the array with `<start>` and `<end>` sentinel entries that
  // carry timings but aren't spoken. Counting them shifts every cue one word
  // early — a constant offset that looks like a plausible reveal rather than a
  // bug, which is exactly why it survived until a real API response was
  // inspected. Confirmed on a live call: 8 entries for 6 spoken words.
  const spoken = (wordTimestamps ?? []).filter(w => !/^<[^>]*>$/.test(w.word))
  const wordsIn = text => (text.match(/\S+/g) || []).length
  const cues = []

  let consumed = 0
  let drifted = false
  for (const segment of segments.slice(0, -1)) {
    consumed += wordsIn(segment)
    const word = spoken[consumed]
    if (word) {
      cues.push(Math.max(0, word.start - CUE_LEAD_SECONDS))
    } else if (consumed === spoken.length) {
      // A [click] after the final word: legitimate authoring — a last reveal
      // that lands as the sentence finishes — not a desynchronised count.
      cues.push(duration)
    } else {
      drifted = true
      break
    }
  }

  if (drifted || spoken.length === 0) {
    const count = segments.length - 1
    return {
      cues: Array.from({ length: count }, (_, i) => (duration * (i + 1)) / (count + 1)),
      estimated: true,
    }
  }
  return { cues, estimated: false }
}

/**
 * Turns narration prose into short, readable caption chunks.
 *
 * A live build supplies HeyGen's word timings, so each chunk follows the real
 * voice. Existing cached manifests predate captions; for those, the same
 * chunks are distributed by word count across the known clip duration. That
 * fallback is intentionally deterministic, which lets `narration:captions`
 * add useful captions without re-synthesising speech or spending credits.
 */
export function buildCaptions(text, wordTimestamps, duration) {
  const tokens = text.replace(CUE_MARKER, '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
  if (!tokens.length || !Number.isFinite(duration) || duration <= 0) return []

  const chunks = []
  let current = []
  for (const token of tokens) {
    current.push(token)
    const characters = current.join(' ').length
    const endsPhrase = /[.!?;:]$/.test(token)
    if ((current.length >= 5 && endsPhrase) || current.length >= 12 || characters >= 72) {
      chunks.push(current)
      current = []
    }
  }
  if (current.length) chunks.push(current)

  const spoken = (wordTimestamps ?? []).filter(word => !/^<[^>]*>$/.test(word.word))
  const hasExactTimings = spoken.length >= tokens.length
  let offset = 0

  return chunks.map((chunk, index) => {
    const startWord = offset
    const endWord = offset + chunk.length - 1
    offset += chunk.length

    const proportionalStart = (duration * startWord) / tokens.length
    const proportionalEnd = (duration * offset) / tokens.length
    const start = hasExactTimings ? spoken[startWord]?.start ?? proportionalStart : proportionalStart
    const measuredEnd = hasExactTimings ? spoken[endWord]?.end : null
    const nextStart = hasExactTimings ? spoken[offset]?.start : null
    const end = Math.min(duration, Math.max(start + 0.35, measuredEnd ?? nextStart ?? proportionalEnd))

    return {
      start: Number(Math.max(0, start).toFixed(3)),
      end: Number((index === chunks.length - 1 ? duration : end).toFixed(3)),
      text: chunk.join(' '),
    }
  })
}

/**
 * Reads every narration file and pairs it back onto the deck, refusing to
 * proceed on a count mismatch. This is the one place the (file, index) key is
 * validated — a section that gained a slide since the narration was written
 * fails here with the file named, rather than shifting every later line by one.
 */
export async function buildIndex(data) {
  const groups = groupSlides(data)
  const files = new Set(
    (await readdir(NARRATION_DIR).catch(() => [])).filter(f => f.endsWith('.md')).map(f => basename(f, '.md')),
  )

  const entries = []
  const problems = []

  for (const [file, slides] of groups) {
    if (!files.has(file)) {
      problems.push(`narration/${file}.md is missing (${slides.length} slides unnarrated)`)
      continue
    }
    const blocks = parseNarrationFile(await readFile(join(NARRATION_DIR, `${file}.md`), 'utf-8'))
    if (blocks.length !== slides.length) {
      problems.push(
        `narration/${file}.md has ${blocks.length} blocks but the section has ${slides.length} slides — ` +
          `run \`yarn narration:scaffold\` to realign, then move the prose`,
      )
      continue
    }
    slides.forEach((slide, i) => {
      const prose = blocks[i]
      if (prose) entries.push({ ...slide, ...splitCues(prose) })
    })
  }

  return { entries, problems }
}
