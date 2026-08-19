<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

// Real data from the personal Merge Ledger export, calendar windows August
// 2024 – July 2025 against August 2025 – July 2026 (the ledger starts 14
// August 2024, so the first window is missing its first thirteen days —
// immaterial at this scale). Aggregate counts only — repo and client names
// stay off the deck. Multipliers are rounded from 17.8 and 16.2; the tests
// figure is shown unrounded because it is the punchline.
const ROWS = [
  { label: 'Pull requests merged', prior: 343, now: 6102, mult: '×18' },
  { label: 'Commits', prior: 967, now: 15710, mult: '×16' },
  { label: 'Tests written', prior: 5, now: 57179, mult: '×11,436' },
]

/* The current year's bar spans this share of the row; each prior bar is scaled
   against its own metric's current year. A floor keeps the tests sliver from
   vanishing — 5 against 57,179 is 0.008%, and "practically nothing but not
   nothing" is the honest rendering. */
const BAR_MAX = 72
const priorWidth = r => `max(${((r.prior / r.now) * BAR_MAX).toFixed(2)}%, 3px)`

// Reads the slide's click state without consuming clicks: each metric takes
// two clicks — the old year on the odd click, the new year on the even one —
// as transitions, reversible on step-back and stepped correctly in export.
const { $clicks } = useSlideContext()
const { isPrintMode } = useNav()
const priorOn = i => (($clicks?.value ?? 0) >= i * 2 + 1)
const nowOn = i => (($clicks?.value ?? 0) >= i * 2 + 2)
const clickCount = computed(() => $clicks?.value ?? 0)

/* The current-year number counts up while its bar sweeps, on the BigNumber
   timing recipe (rAF-timestamped, easeOutCubic). Null means "show the final
   value" — the resting, print and reduced-motion state.

   The sweep runs at var(--motion-draw), so the count-up reads that token at
   mount rather than restating its value — a token change can't desync the
   number from its bar. The fallback is the token's shipped value, for the
   case where the token is missing or unparsable. */
const duration = ref(1200)
onMounted(() => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--motion-draw')
    .trim()
  const ms = raw.endsWith('ms') ? parseFloat(raw) : parseFloat(raw) * 1000
  if (Number.isFinite(ms) && ms > 0) duration.value = ms
})

const shown = ref(ROWS.map(() => null))
const timers = ROWS.map(() => ({ frame: null }))

const fmt = n => n.toLocaleString('en-US')
const display = i => (shown.value[i] === null ? fmt(ROWS[i].now) : fmt(Math.round(shown.value[i])))

function stop(i) {
  cancelAnimationFrame(timers[i].frame)
  shown.value[i] = null
}

function run(i) {
  stop(i)
  if (isPrintMode.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shown.value[i] = 0
  let start = null
  const tick = now => {
    start ??= now
    const t = Math.min((now - start) / duration.value, 1)
    shown.value[i] = ROWS[i].now * (1 - (1 - t) ** 3)
    if (t < 1) timers[i].frame = requestAnimationFrame(tick)
    else shown.value[i] = null
  }
  timers[i].frame = requestAnimationFrame(tick)
}

watch(clickCount, (val, old) => {
  ROWS.forEach((_, i) => {
    const now = val >= i * 2 + 2
    const was = (old ?? 0) >= i * 2 + 2
    if (now && !was) run(i)
    else if (!now && was) stop(i)
  })
})

onBeforeUnmount(() => ROWS.forEach((_, i) => stop(i)))
</script>

<template>
  <div class="mx-auto w-full max-w-3xl merge-compare">
    <div class="mc-legend">
      <span class="mc-key"><i class="mc-swatch mc-swatch--prior" />Aug '24 – Jul '25</span>
      <span class="mc-key"><i class="mc-swatch mc-swatch--now" />Aug '25 – Jul '26</span>
      <!-- Every "now" bar renders the same width because each row is normalized
           to its own current-year value; this note is the cue that the rows are
           not on a shared scale. -->
      <span class="mc-scale-note">(each metric to its own scale)</span>
    </div>

    <div
      v-for="(r, i) in ROWS"
      :key="r.label"
      class="mc-row"
      :class="{ 'is-prior': priorOn(i), 'is-now': nowOn(i) }"
    >
      <div class="mc-head">
        <span class="mc-metric">{{ r.label }}</span>
        <span class="mc-mult">{{ r.mult }}</span>
      </div>
      <div class="mc-line">
        <i class="mc-bar mc-bar--prior" :style="{ width: priorWidth(r) }" />
        <span class="mc-num mc-num--prior">{{ fmt(r.prior) }}</span>
      </div>
      <div class="mc-line">
        <i class="mc-bar mc-bar--now" :style="{ width: `${BAR_MAX}%` }" />
        <span class="mc-num mc-num--now">{{ display(i) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The legend is present on arrival — the two periods are the frame the rows
   land in. Slide-entry animation, hidden state in the keyframe `from`. */
.mc-legend {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.6rem;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.75;
  animation: mc-in var(--motion-slow) var(--motion-ease);
}

@keyframes mc-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

.mc-key {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Swatch heights mirror the bars they key (0.55rem prior, 1rem now), so the
   legend carries the same weight hierarchy the rows do. */
.mc-swatch {
  display: inline-block;
  width: 1.1rem;
  border-radius: 2px;
}

.mc-swatch--prior {
  height: 0.55rem;
  background: var(--brand-text);
  opacity: 0.3;
}

.mc-swatch--now {
  height: 1rem;
  background: var(--brand-primary);
}

.mc-scale-note {
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.7;
}

.mc-row {
  margin-bottom: 1.5rem;
}

.mc-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.45rem;
}

.mc-metric {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-text);
}

.mc-mult {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--brand-primary);
}

.mc-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.mc-line + .mc-line {
  margin-top: 0.4rem;
}

.mc-bar {
  height: 0.55rem;
  border-radius: 2px;
  transform-origin: left center;
}

.mc-bar--prior {
  background: var(--brand-text);
  opacity: 0.3;
}

.mc-bar--now {
  height: 1rem;
  background: var(--brand-primary);
}

.mc-num {
  white-space: nowrap;
  /* Fixed-width digits: the count-up would otherwise jitter as 5 becomes 57. */
  font-variant-numeric: tabular-nums;
}

.mc-num--prior {
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.65;
}

.mc-num--now {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--brand-primary);
}

/* Each metric takes two clicks, two story beats, so the speaker can hold the
   old year on screen for as long as the narration needs. The odd click brings
   the label and the old year's sliver; the even click sweeps the new year's
   bar out slowly (the count-up above is timed to this sweep) and lands the
   multiplier last. Click-driven, so transitions (reversible), not animations;
   hidden states live in the class-off rules and export steps the click
   states. */
.mc-metric {
  opacity: 0;
  transform: translateY(var(--motion-rise));
  transition:
    opacity var(--motion-base) var(--motion-ease),
    transform var(--motion-base) var(--motion-ease);
}

.mc-bar--prior {
  transform: scaleX(0);
  transition: transform var(--motion-slow) var(--motion-ease) 120ms;
}

.mc-num--prior {
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease) 480ms;
}

.mc-bar--now {
  transform: scaleX(0);
  /* Its own click now, so the sweep starts immediately — the count-up in the
     script starts with it. */
  transition: transform var(--motion-draw) var(--motion-ease);
}

.mc-num--now {
  opacity: 0;
  transition: opacity var(--motion-slow) var(--motion-ease);
}

.mc-mult {
  opacity: 0;
  transform: translateY(var(--motion-rise));
  transition:
    opacity var(--motion-base) var(--motion-ease) var(--motion-draw),
    transform var(--motion-base) var(--motion-ease) var(--motion-draw);
}

.mc-row.is-prior .mc-metric {
  opacity: 1;
  transform: translateY(0);
}

.mc-row.is-prior .mc-bar--prior {
  transform: scaleX(1);
}

/* Restated: .mc-num--prior's resting opacity is 0.65, not 1. */
.mc-row.is-prior .mc-num--prior {
  opacity: 0.65;
}

.mc-row.is-now .mc-bar--now {
  transform: scaleX(1);
}

.mc-row.is-now .mc-num--now {
  opacity: 1;
}

.mc-row.is-now .mc-mult {
  opacity: 1;
  transform: translateY(0);
}

/* Backward navigation is instant, matching the deck's global reveal rule.
   Whole selector inside :global() — the scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops what follows it. */
:global(.slidev-nav-go-backward .mc-metric),
:global(.slidev-nav-go-backward .mc-bar--prior),
:global(.slidev-nav-go-backward .mc-num--prior),
:global(.slidev-nav-go-backward .mc-bar--now),
:global(.slidev-nav-go-backward .mc-num--now),
:global(.slidev-nav-go-backward .mc-mult) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
