<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'md' },
})

// Stylised trajectory, not a data plot. The two anchors are the sourced facts
// (launch February 2025; 134,646 commits/day February 2026 — SemiAnalysis,
// 2/27/26); the curve between them is an exponential drawn to match the source
// chart's shape. The original screenshot stays in public/ as the reference.
const W = 880
const H = 292
const PAD_L = 28
/* Sized for the end labels at their 22px/18px sizes — tighter clips "134,646 / day". */
const PAD_R = 185
const PAD_T = 44
const PAD_B = 44
const K = 4.6
const N = 48

const points = computed(() => {
  const pts = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = PAD_L + t * (W - PAD_L - PAD_R)
    const v = (Math.exp(K * t) - 1) / (Math.exp(K) - 1)
    const y = H - PAD_B - v * (H - PAD_T - PAD_B)
    pts.push([x, y])
  }
  return pts
})

const linePath = computed(() =>
  points.value.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '),
)
const areaPath = computed(
  () => `${linePath.value} L ${(W - PAD_R).toFixed(1)} ${H - PAD_B} L ${PAD_L} ${H - PAD_B} Z`,
)

const endX = W - PAD_R
const endY = PAD_T
const baseY = H - PAD_B

const sizeClasses = {
  sm: 'w-full max-w-lg',
  md: 'w-full max-w-xl',
  lg: 'w-full max-w-3xl',
}
</script>

<template>
  <figure :class="['mx-auto commit-growth', sizeClasses[size] || sizeClasses.md]">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Claude Code commits per day on public GitHub: near zero at launch in February 2025, growing exponentially to 134,646 per day by February 2026"
    >
      <defs>
        <linearGradient id="cg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="cg-grad-a" />
          <stop offset="1" class="cg-grad-b" />
        </linearGradient>
      </defs>

      <line class="cg-baseline" :x1="PAD_L" :y1="baseY" :x2="W - PAD_R + 40" :y2="baseY" />

      <path class="cg-area" :d="areaPath" />
      <path class="cg-line" :d="linePath" pathLength="1" />

      <g class="cg-end">
        <line class="cg-drop" :x1="endX" :y1="endY + 8" :x2="endX" :y2="baseY" />
        <circle class="cg-halo" :cx="endX" :cy="endY" r="11" />
        <circle :cx="endX" :cy="endY" r="5" />
        <text class="cg-end-value" :x="endX + 16" :y="endY + 1">134,646 / day</text>
        <text class="cg-end-date" :x="endX + 16" :y="endY + 21">February 2026</text>
      </g>

      <text class="cg-start" :x="PAD_L" :y="baseY + 24">Launch · February 2025</text>
    </svg>
  </figure>
</template>

<style scoped>
.commit-growth svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.cg-baseline {
  stroke: var(--brand-text);
  stroke-width: 1;
  opacity: 0.3;
}

/* Gradient rather than a flat tint: the fill fades toward the baseline, so the
   curve's height — the data — carries the weight, not the block of colour. */
.cg-grad-a {
  stop-color: var(--brand-primary);
  stop-opacity: 0.2;
}

.cg-grad-b {
  stop-color: var(--brand-primary);
  stop-opacity: 0.02;
}

.cg-area {
  fill: url(#cg-grad);
  transition: opacity var(--motion-slow) var(--motion-ease) 300ms;
}

.cg-drop {
  stroke: var(--brand-primary);
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0.35;
}

.cg-halo {
  fill: var(--brand-primary);
  fill-opacity: 0.15;
}

.cg-line {
  fill: none;
  stroke: var(--brand-primary);
  stroke-width: 3;
  stroke-linecap: round;
  /* Fully drawn is the base state — print export and reduced motion land on the
     finished chart. */
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset var(--motion-draw) var(--motion-ease);
}

.cg-end circle {
  fill: var(--brand-primary);
}

.cg-end {
  /* Arrives as the line finishes drawing. */
  transition: opacity var(--motion-base) var(--motion-ease) var(--motion-draw);
}

/* The chart's only call site sits inside a <v-click>, which hides with opacity —
   a slide-entry animation would run and finish behind the invisible wrapper, so
   the click revealed a chart that was already drawn. The draw rides the v-click
   state instead: hidden holds the undrawn state with transitions off (stepping
   backward is instant, matching the deck rule), and losing the class plays the
   draw exactly when the audience is looking. Export steps click states with
   transitions killed, landing on the drawn base state above. */
:global(.slidev-vclick-hidden .cg-area),
:global(.slidev-vclick-hidden .cg-end) {
  opacity: 0;
  transition: none;
}

:global(.slidev-vclick-hidden .cg-line) {
  stroke-dashoffset: 1;
  transition: none;
}

/* The 880-unit viewBox renders at 576px (`md`), a 0.65 scale — these sizes are
   set for what survives that scale on a projector, not for the viewBox. */
.cg-end-value {
  font-size: 22px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.cg-end-date {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}

.cg-start {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}

</style>
