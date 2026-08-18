<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

defineProps({
  // The name the audience walked in with, and the one the talk replaces it with.
  from: { type: String, required: true },
  to: { type: String, required: true },
  subtitle: { type: String, default: '' },
})

// One click plays the whole opening — the beats are chained on delays in CSS
// below, not on further clicks, so the speaker triggers it once and lets it run.
// The slide declares `clicks: 1`; nothing here is a v-click, so Slidev has no
// other way to know there is a step at all.
//
// A transition rather than an animation, per the deck's rule: the opening is
// exactly where a speaker steps back to re-land a line.
const { $clicks } = useSlideContext()
const struck = computed(() => ($clicks?.value ?? 0) >= 1)
</script>

<template>
  <h1 class="cover-title-swap" :class="{ 'is-struck': struck }">
    <s class="cts-from">
      <span class="cts-word">{{ from }}</span>
      <!-- The rule is a second copy of the word, drawn in transparent ink so
           only its line-through shows. That hands placement to the font's own
           strikethrough metrics instead of a guessed percentage — the cover's
           5rem line box is far taller than its 3.75rem text, so "halfway down
           the box" is nowhere near halfway up the glyphs. Clipped from the left
           so the line draws itself across the word. -->
      <span class="cts-rule" aria-hidden="true">{{ from }}</span>
    </s>
    <span class="cts-to">{{ to }}</span>
  </h1>
  <p v-if="subtitle" class="cover-subtitle" :class="{ 'is-shown': struck }">
    {{ subtitle }}
  </p>
</template>

<style scoped>
/* Both names share one grid cell, so the swap is a cross-fade in place with no
   reflow. `justify-items: start` keeps each shrink-wrapped to its own text —
   without it they stretch the full slide width and the cross-out runs off into
   empty space. The cell is as wide as the longer name; both are left-aligned,
   so the shorter one still starts at the slide's text edge. */
.cover-title-swap {
  display: grid;
  justify-items: start;
}

.cover-title-swap > * {
  grid-area: 1 / 1;
}

.cts-from {
  position: relative;
  /* <s> for the semantics — this name is being retired, and that is the slide's
     whole point — but the UA's own line would arrive instantly and give away
     the beat, so the drawn one below replaces it. */
  text-decoration: none;
  /* Beat 2 of 4. Waits out the draw plus a hold long enough for the room to read
     the word as crossed out — without the hold the cross-out is a state nobody
     sees, only a smear on the way to the swap. */
  transition: opacity var(--motion-base) ease;
  transition-delay: 1040ms;
}

/* Beat 1: the rule draws itself left to right. */
.cts-rule {
  position: absolute;
  inset: 0;
  color: transparent;
  text-decoration-line: line-through;
  text-decoration-color: var(--brand-strike);
  text-decoration-thickness: 0.075em;
  /* One continuous stroke: skip-ink would break the line around the descenders
     and read as a typographic nicety rather than a cross-out. */
  text-decoration-skip-ink: none;
  /* A strikethrough sits at mid x-height, which is the right place for a word
     set in running text. This one is 60px display type where the caps and
     ascenders carry most of the mass, so it reads low there — this splits the
     difference toward mid cap-height. The two themes' fonts have the same
     cap-to-x-height gap (~0.09em, Roboto and Inter alike), so one nudge fits
     both. */
  transform: translateY(-0.05em);
  clip-path: inset(0 100% 0 0);
  transition: clip-path var(--motion-slow) var(--motion-ease);
}

.cover-title-swap.is-struck .cts-rule {
  clip-path: inset(0 0 0 0);
}

.cover-title-swap.is-struck .cts-from {
  opacity: 0;
}

.cts-to {
  opacity: 0;
  transform: translateY(var(--motion-rise));
  transition:
    opacity var(--motion-base) ease,
    transform var(--motion-base) var(--motion-ease);
}

/* Beat 3: arrives only once the old name has fully gone. Stacked in one cell,
   any overlap would read as a single smeared word rather than a replacement. */
.cover-title-swap.is-struck .cts-to {
  opacity: 1;
  transform: none;
  transition-delay: 1320ms;
}

.cover-subtitle {
  opacity: 0;
  transform: translateY(var(--motion-rise));
  transition:
    opacity var(--motion-base) ease,
    transform var(--motion-base) var(--motion-ease);
}

/* Beat 4, a short breath after the new title lands. 0.5, not 1: the theme's
   `h1 + p` rule already sets `opacity-50` on a cover subtitle, and this scoped
   selector outranks it — restated so the revealed subtitle sits exactly where it
   did before the reveal existed. */
.cover-subtitle.is-shown {
  opacity: 0.5;
  transform: none;
  transition-delay: 1720ms;
}

/* Stepping back is navigation, not narration — and a two-second build replayed
   in reverse, delays and all, is the worst case of it. Matches the deck's global
   backward rule. The whole selector goes inside :global(): the scoped compiler
   keeps only the :global() portion of a mixed selector and drops the rest. */
:global(.slidev-nav-go-backward .cts-rule),
:global(.slidev-nav-go-backward .cts-from),
:global(.slidev-nav-go-backward .cts-to),
:global(.slidev-nav-go-backward .cover-subtitle) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
