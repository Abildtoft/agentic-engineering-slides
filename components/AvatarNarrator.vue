<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

/**
 * Auto-mode: plays a pre-rendered avatar clip per slide and drives the deck
 * from it — click reveals fire on cue times measured inside the narration, and
 * the slide advances when the clip ends.
 *
 * Strictly opt-in via `?auto=1`. With the parameter absent this component
 * fetches nothing and renders nothing, so the live-presentation path — the one
 * that matters on stage — is untouched by everything below.
 *
 * The manifest is built offline by scripts/narration-build.mjs. See AGENTS.md
 * for the format and the reason clips are per slide rather than per click.
 */

const MANIFEST_URL = '/narration/manifest.json'

/** How long an un-narrated slide is held before auto-mode moves on. Section
    dividers are the main case and want to read as a beat, not a stall. */
const SILENT_DWELL_MS = 3500

/**
 * The pause between one clip ending and the next one speaking.
 *
 * Measured, not guessed: every rendered clip carries ~0.2s of lead-in silence
 * and **zero** at the tail — it ends on the final syllable. Left alone, the
 * deck runs one slide's last syllable into the next slide's first word about
 * 300ms later, which no speaker does and which reads as the deck rushing you.
 *
 * The gap is taken *after* the slide has already changed, so the new slide
 * lands, the deck's own fade settles, and the audience gets a moment with it
 * before the voice starts. Section dividers get longer, because a chapter
 * change should feel like one.
 */
const SLIDE_GAP_MS = 700
const SECTION_GAP_MS = 1500

/**
 * The dissolve: how long the tile takes to resolve to the avatar's own still
 * between clips, and to come back off it.
 *
 * There was a blur here, added to stop two clips ghosting into each other
 * during the blend. It was solving a problem this design had already removed:
 * the outgoing clip reaches zero *before* the incoming one starts, so the two
 * videos never coexist — measured, opacity hits 0 at 341ms and only begins
 * rising at 371ms. The midpoint is the still, alone. There is nothing to ghost,
 * so there was nothing for the blur to fix, and animating a blur radius is both
 * the most expensive thing on the timeline and the least smooth — the raster is
 * regenerated per frame and steps visibly at small sizes.
 *
 * What is left is opacity and a whisper of scale, which the compositor handles
 * without touching the raster. Two short movements with a genuine rest between
 * them, rather than 700ms of continuous morphing.
 */
const DISSOLVE_MS = 220

/**
 * Symmetric, deliberately not `--motion-ease`.
 *
 * The deck's token is a hard decelerate — it covers ~73% of its distance in the
 * first third, which is right for something arriving and settling. Applied to a
 * fade it means the image drops most of the way immediately and then hangs near
 * zero for the rest of the duration, twice per handoff. That hang is what reads
 * as sluggish. A dissolve wants to be even at both ends.
 */
const DISSOLVE_EASE = 'cubic-bezier(0.4, 0, 0.6, 1)'

const { currentSlideNo, currentSlideRoute, clicks, clicksTotal, hasNext, next, nextSlide, isPresenter, isPrintMode } =
  useNav()

/**
 * Where the tile sits, per slide. Bottom-right suits the text slides, but a
 * full-width diagram has no free corner — on `MergeLedgerChart` the default
 * covers the climb, which is the entire point of that slide. Set
 * `narrator: top-right` in a slide's frontmatter to move it; the deck's titles
 * are left-aligned, so the top-right is usually the emptiest corner.
 *
 * `narrator: hidden` is for the slides that have no free corner at all —
 * `MergeLedgerChart` fills the frame and its curve climbs into the top-right,
 * so every position covers something the slide is there to show. The voice and
 * the cues carry on; only the picture goes away, which is the right trade when
 * the picture is a nicety and the chart is the argument.
 */
const PLACEMENTS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'hidden']
const placement = computed(() => {
  const wanted = currentSlideRoute.value?.meta?.slide?.frontmatter?.narrator
  return PLACEMENTS.includes(wanted) ? wanted : 'bottom-right'
})

const manifest = ref(null)
const started = ref(false)
const paused = ref(false)

/**
 * Two media elements, not one.
 *
 * With a single element, setting `.src` fires `emptied` immediately — the frame
 * blanks, and the next clip only *begins* loading at that moment. Measured on
 * localhost that was a 96ms hole; over a network it is however long the fetch
 * takes, once per slide, with the deck silent. Double-buffering lets the next
 * clip be fully loaded before it is needed, and gives us two live frames to
 * crossfade between — which is also what hides the pose jump between two
 * independently rendered clips.
 */
const videoA = ref(null)
const videoB = ref(null)
const activeIndex = ref(0)
const elements = () => [videoA.value, videoB.value]
const activeEl = () => elements()[activeIndex.value]
const idleEl = () => elements()[1 - activeIndex.value]

/**
 * Auto-mode never runs in the presenter window. Presenter mode renders the deck
 * twice in two windows against one shared nav state: without this, both copies
 * play their own audio a few hundred milliseconds apart, and both drive the
 * clicks, so every reveal fires twice. The audience window is the one that
 * narrates.
 */
const enabled = computed(
  () => !isPrintMode.value && !isPresenter.value && new URLSearchParams(location.search).has('auto'),
)

const entryFor = no => manifest.value?.slides?.[no] ?? null
const sourceOf = entry => entry?.video ?? entry?.audio ?? null

const entry = computed(() => entryFor(currentSlideNo.value))

/** Per slide, not per deck: a partly-rendered deck can mix the two, so video can
    be bought for the slides that need a face and audio kept for the rest. The
    same <video> element plays both — it is an HTMLMediaElement either way, and
    the timing logic never has to know which it is. */
const hasVideo = computed(() => Boolean(entry.value?.video))
const still = computed(() => manifest.value?.still ?? null)

/** False while the deck is between clips, which lets the still behind the media
    elements show through. The swap happens under it. */
const speaking = ref(true)

let cueIndex = 0
let frame = null
let dwell = null
let gapTimer = null
let handoffTimers = []
/** Set only when the slide changed because a clip finished. Manual navigation
    should respond immediately; an automatic advance is the one that wants the
    beat. */
let autoAdvanced = false

/** Cues are checked against the clip's own clock rather than fired from
    setTimeout: a timer keeps running through a stall, a pause or a seek, and
    would walk the reveals out of step with the voice. currentTime cannot. */
function tick() {
  frame = requestAnimationFrame(tick)
  const element = activeEl()
  if (!element || element.paused) return

  const cues = entry.value?.cues ?? []
  while (cueIndex < cues.length && element.currentTime >= cues[cueIndex]) {
    cueIndex++
    // Guarded rather than assumed: the cue count is authored by hand against an
    // estimate, while clicksTotal is the real number and is only known now that
    // the slide is on screen. Over-marking a slide would otherwise run `next()`
    // past the last reveal and skip the following slide entirely.
    if (clicks.value < clicksTotal.value) next()
  }
}

function clearTimers() {
  clearTimeout(dwell)
  clearTimeout(gapTimer)
  for (const timer of handoffTimers) clearTimeout(timer)
  dwell = null
  gapTimer = null
  handoffTimers = []
}

async function advance() {
  if (hasNext.value) await nextSlide()
}

function onEnded(event) {
  // The idle element is buffering the next clip and can fire its own events;
  // only the one actually playing should advance the deck.
  if (event.target !== activeEl()) return

  if (clicks.value < clicksTotal.value) {
    console.warn(
      `AvatarNarrator: slide ${currentSlideNo.value} has ${clicksTotal.value - clicks.value} ` +
        `reveal(s) the narration never cued — add [click] markers or they never show in auto mode`,
    )
  }
  autoAdvanced = true
  advance()
}

/** Points the idle element at whatever comes next so the fetch is already done
    by the time the deck gets there. Deliberately after the crossfade: assigning
    `src` blanks the element, and until the fade completes it is still the
    outgoing picture on screen. */
function preloadNext() {
  const url = sourceOf(entryFor(currentSlideNo.value + 1))
  const buffer = idleEl()
  if (!url || !buffer || buffer.dataset.src === url) return
  buffer.dataset.src = url
  buffer.src = url
}

/** A chapter change should feel like one. Read after the route has moved, so
    this is the incoming slide's layout. */
function gapForCurrent() {
  const layout = currentSlideRoute.value?.meta?.slide?.frontmatter?.layout
  return layout === 'section' ? SECTION_GAP_MS : SLIDE_GAP_MS
}

/**
 * Starts whatever slide is now on screen. Bound to the slide number only —
 * `clicks` deliberately isn't watched, because this component changes it itself
 * and would otherwise restart the clip on its own cue.
 */
function playCurrent({ gap = 0 } = {}) {
  clearTimers()
  cueIndex = 0

  if (!enabled.value || !started.value || paused.value) return

  if (!entry.value) {
    // No narration for this slide: hold a beat, then keep moving. Silence is a
    // legitimate authoring choice, so this isn't treated as an error.
    dwell = setTimeout(advance, SILENT_DWELL_MS)
    return
  }

  const url = sourceOf(entry.value)
  const target = idleEl()
  if (!url || !target) return

  // Usually already loaded by preloadNext(); this covers a jump to an arbitrary
  // slide, where the buffer holds the wrong clip.
  if (target.dataset.src !== url) {
    target.dataset.src = url
    target.src = url
  }

  /** Puts `target` on screen. The outgoing element is paused and dropped to
      transparent in the same tick, so whatever is underneath — the still —
      is what any dissolve resolves against. */
  const swap = () => {
    const outgoing = activeEl()
    activeIndex.value = 1 - activeIndex.value
    // Seeking before metadata arrives throws in some engines, and a freshly
    // assigned source is at 0 anyway.
    if (target.readyState > 0 && target.currentTime !== 0) target.currentTime = 0
    outgoing?.pause()
  }

  const speak = () => {
    // Autoplay with sound is blocked until the document has been interacted
    // with, which is why start() exists at all. A rejection after that point is
    // a real failure — surface it rather than leaving a deck that silently stops.
    target.play().catch(error => console.error('AvatarNarrator: playback blocked', error))
    handoffTimers.push(setTimeout(preloadNext, DISSOLVE_MS + 40))
  }

  if (gap <= 0) {
    // Manual navigation: no settle, because a keypress should be answered now.
    swap()
    speaking.value = true
    speak()
    return
  }

  // Settle to the still, swap underneath it, then come back off it so the face
  // is live and sharp just as the first word lands. The extra time on a section
  // divider goes into the rest, not into the dissolves.
  speaking.value = false
  handoffTimers = [
    setTimeout(() => {
      swap()
      speaking.value = true
    }, Math.max(0, gap - DISSOLVE_MS)),
    setTimeout(speak, gap),
  ]
}

/** The browser's autoplay policy needs a gesture before audio can start, so the
    first play is always user-initiated. Everything after it is chained. */
function start() {
  started.value = true
  paused.value = false
  playCurrent()
}

function toggle() {
  if (!started.value) return start()
  paused.value = !paused.value
  if (paused.value) {
    activeEl()?.pause()
    clearTimers()
  } else {
    activeEl()
      ?.play()
      .catch(() => {})
  }
}

watch(currentSlideNo, () => {
  const gap = autoAdvanced ? gapForCurrent() : 0
  autoAdvanced = false
  playCurrent({ gap })
})

onMounted(async () => {
  if (!enabled.value) return
  frame = requestAnimationFrame(tick)
  try {
    const response = await fetch(MANIFEST_URL)
    if (!response.ok) throw new Error(`${response.status}`)
    manifest.value = await response.json()
    preloadNext()
  } catch (error) {
    console.error(`AvatarNarrator: no manifest at ${MANIFEST_URL} — run \`yarn narration:build\``, error)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimers()
})
</script>

<template>
  <div v-if="enabled" class="narrator" :data-placement="placement" :data-idle="!entry || null">
    <div class="narrator-frame">
      <!-- Under both media elements. In audio-only mode it is the whole
           picture; in video mode it covers the moment before the first clip
           has painted. -->
      <img v-if="still" class="narrator-layer" :src="still" alt="" />
      <video
        v-for="(_, index) in 2"
        :key="index"
        :ref="el => (index === 0 ? (videoA = el) : (videoB = el))"
        class="narrator-layer narrator-video"
        :class="{ 'is-active': activeIndex === index && hasVideo && speaking }"
        playsinline
        preload="auto"
        @ended="onEnded"
      />
    </div>
    <button class="narrator-toggle" type="button" @click="toggle">
      {{ !started ? 'Start narration' : paused ? 'Resume' : 'Pause' }}
    </button>
  </div>
</template>

<style scoped>
/* `fixed` here does NOT mean "relative to the viewport": Slidev scales
   .slidev-slide-content with a transform, and a transformed ancestor becomes
   the containing block for fixed descendants. So the tile is positioned in the
   slide's own coordinate space and scales with it — which is what a slide
   overlay wants, since the framing then holds at any window size. Measured:
   1200x830 viewport, scale 1.2245, a 180px tile painting at 220px.

   It still doesn't ride the slide transition — GlobalBottom is a sibling of the
   slide components, so the crossfade doesn't apply to it. */
.narrator {
  position: fixed;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  width: 180px;
}

.narrator[data-placement='bottom-right'] { right: 1.5rem; bottom: 1.5rem; }
.narrator[data-placement='bottom-left'] { left: 1.5rem; bottom: 1.5rem; }
.narrator[data-placement='top-right'] { right: 1.5rem; top: 1.5rem; }
.narrator[data-placement='top-left'] { left: 1.5rem; top: 1.5rem; }

/* Above the tile in the top corners, so the control never sits over the slide
   title's line while the tile itself is clear of it. */
.narrator[data-placement^='top'] {
  flex-direction: column-reverse;
}

/* Shrunk to a pixel rather than removed: the media elements inside are what is
   playing the narration, and an element taken out of the render tree may be
   throttled. The Pause control stays — losing the picture shouldn't cost the
   only way to stop the deck. */
.narrator[data-placement='hidden'] {
  right: 1.5rem;
  bottom: 1.5rem;
}

.narrator[data-placement='hidden'] .narrator-frame {
  width: 1px;
  height: 1px;
  aspect-ratio: auto;
  opacity: 0;
  box-shadow: none;
}

/* Square tile against a 16:9 source: object-fit below crops to the face rather
   than letterboxing. Asking HeyGen for a square render instead would bake the
   bars into the pixels — see scripts/narration-build.mjs. */
.narrator-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.75rem;
  background: var(--brand-bg-accent);
  box-shadow: 0 6px 24px rgb(0 0 0 / 18%);
  transition: opacity var(--motion-slow) var(--motion-ease);
}

.narrator-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* The dissolve itself: opacity, plus a scale small enough to be felt rather
   than seen. Both are compositor properties — nothing here re-rasterises, which
   is why it stays smooth while an animated blur did not.
 *
 * Between slides neither element is active, so the tile resolves to the still
 * underneath — the same face at rest — and the source swap happens there, where
 * there is nothing to see. The outgoing clip is fully gone before the incoming
 * one appears, so the two never blend.
 *
 * An audio-only source paints nothing, so its element is simply never made
 * active and the still shows through for the whole slide. Transparent rather
 * than `display: none`: an element removed from the render tree may have its
 * playback throttled, and it still has to play. */
.narrator-video {
  opacity: 0;
  transform: scale(1.015);
  transition:
    opacity v-bind('`${DISSOLVE_MS}ms`') v-bind('DISSOLVE_EASE'),
    transform v-bind('`${DISSOLVE_MS}ms`') v-bind('DISSOLVE_EASE');
}

.narrator-video.is-active {
  opacity: 1;
  transform: scale(1);
}

/* Print and reduced motion get the resolved state, never a frame caught
   mid-dissolve. */
@media (prefers-reduced-motion: reduce) {
  .narrator-video {
    transition-duration: 1ms;
  }
}

/* A slide with no narration would otherwise leave the last frame of the
   previous one sitting there, mouth open. */
.narrator[data-idle] .narrator-frame {
  opacity: 0.35;
}

.narrator-toggle {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--brand-primary);
  border-radius: 0.5rem;
  background: var(--brand-bg);
  color: var(--brand-primary);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
