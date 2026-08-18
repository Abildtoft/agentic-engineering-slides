<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Real data, not a stylised trajectory: pull/merge requests merged per month
// across GitHub and GitLab, from the personal Merge Ledger export. Aggregate
// counts only — repo and client names stay off the deck. Full months September
// 2024 through July 2026; the partial Augusts at each end are dropped.
const MONTHLY = [
  23, 3, 32, 12, 64, 38, 14, 22, 41, 65, 25, 8, 10, 38, 22, 58, 176, 264, 790,
  863, 1347, 1354, 1172,
]
const BEND_INDEX = 15 // December 2025 — the last month of the old normal
const PEAK_INDEX = 21 // June 2026, 1,354

const W = 880
const H = 320
const PAD_L = 28
const PAD_R = 100
const PAD_B = 48
/* The peak label sits centred above its dot, so the curve tops out low enough
   to leave two lines of text clear of both the dot's halo and the frame edge. */
const CURVE_TOP = 96

const MAX = Math.max(...MONTHLY)
const step = (W - PAD_L - PAD_R) / (MONTHLY.length - 1)
const px = i => PAD_L + i * step
const py = v => H - PAD_B - (v / MAX) * (H - PAD_B - CURVE_TOP)

const points = MONTHLY.map((v, i) => [px(i), py(v)])
const toPath = pts =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

/* The line is two paths split at the bend, because the two halves are two
   beats of the story: the flat year draws itself out on slide entry, stops at
   December 2025, and the climb rides the slide's first click. They share the
   bend point, so the finished line is seamless. */
const flatPath = toPath(points.slice(0, BEND_INDEX + 1))
const climbPath = toPath(points.slice(BEND_INDEX))
const areaPath = `${toPath(points)} L ${px(MONTHLY.length - 1).toFixed(1)} ${H - PAD_B} L ${PAD_L} ${H - PAD_B} Z`

const peakX = px(PEAK_INDEX)
const peakY = py(MONTHLY[PEAK_INDEX])
const baseY = H - PAD_B

// The flat year's counterpart to the peak label: same period, other scale.
// 475 merges over the 16 months before the bend ≈ 30 a month.
const avgX = px(5)

const ticks = [
  { i: 0, label: "Sep '24" },
  { i: 4, label: "Jan '25" },
  { i: 10, label: "Jul '25" },
  { i: 16, label: "Jan '26" },
  { i: 22, label: "Jul '26" },
]

// Reads the slide's click state without consuming clicks: the climb is the
// slide's first beat after arrival, so it rides click 1 as a transition —
// reversible on step-back, stepped correctly in export.
const { $clicks } = useSlideContext()
const bent = computed(() => ($clicks?.value ?? 0) >= 1)
</script>

<template>
  <figure class="mx-auto w-full max-w-3xl merge-ledger">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'is-bent': bent }"
      role="img"
      aria-label="Pull requests merged per month across GitHub and GitLab: between 3 and 65 a month through December 2025, bending sharply upward in January 2026 and peaking at 1,354 in June 2026"
    >
      <defs>
        <linearGradient id="mlc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="mlc-grad-a" />
          <stop offset="1" class="mlc-grad-b" />
        </linearGradient>
      </defs>

      <line class="mlc-baseline" :x1="PAD_L" :y1="baseY" :x2="W - PAD_R + 40" :y2="baseY" />

      <g class="mlc-ticks">
        <text
          v-for="t in ticks"
          :key="t.label"
          :x="px(t.i)"
          :y="baseY + 24"
          :text-anchor="t.i === 0 ? 'start' : 'middle'"
        >
          {{ t.label }}
        </text>
      </g>

      <path class="mlc-area" :d="areaPath" />
      <path class="mlc-flat" :d="flatPath" pathLength="1" />
      <path class="mlc-climb" :d="climbPath" pathLength="1" />

      <text class="mlc-avg" :x="avgX" :y="baseY - 26" text-anchor="middle">~30 / month</text>

      <g class="mlc-end">
        <line class="mlc-drop" :x1="peakX" :y1="peakY + 8" :x2="peakX" :y2="baseY" />
        <circle class="mlc-halo" :cx="peakX" :cy="peakY" r="11" />
        <circle :cx="peakX" :cy="peakY" r="5" />
        <text class="mlc-end-value" :x="peakX" :y="peakY - 40" text-anchor="middle">1,354 / month</text>
        <text class="mlc-end-date" :x="peakX" :y="peakY - 19" text-anchor="middle">June 2026</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.merge-ledger svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.mlc-baseline {
  stroke: var(--brand-text);
  stroke-width: 1;
  opacity: 0.3;
}

/* Gradient rather than a flat tint: the fill fades toward the baseline, so the
   curve's height — the data — carries the weight, not the block of colour. */
.mlc-grad-a {
  stop-color: var(--brand-primary);
  stop-opacity: 0.2;
}

.mlc-grad-b {
  stop-color: var(--brand-primary);
  stop-opacity: 0.02;
}

.mlc-flat,
.mlc-climb {
  fill: none;
  stroke: var(--brand-primary);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 1;
}

/* Beat one, on slide entry: sixteen months crawl by at 1.5× the deck's draw —
   deliberately slower than any other draw in the deck, because the point of
   this beat is how long a normal year takes. Hidden state in the keyframe
   `from`; print and reduced motion land on the drawn line. */
.mlc-flat {
  stroke-dashoffset: 0;
  animation: mlc-draw calc(var(--motion-draw) * 1.5) var(--motion-ease);
}

@keyframes mlc-draw {
  from {
    stroke-dashoffset: 1;
  }
}

/* The flat year's own label arrives once its line has finished — the muted
   counterpart the peak label will be measured against. */
.mlc-avg {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
  animation: mlc-fade var(--motion-slow) var(--motion-ease)
    calc(var(--motion-draw) * 1.5) backwards;
}

@keyframes mlc-fade {
  from {
    opacity: 0;
  }
}

/* Beat two, on the slide's first click: the climb. Click-driven, so a
   transition (reversible), not an animation. The easing is the one deliberate
   departure from the deck's curve — an ease-in, because this line is the story
   of acceleration: it creeps out of the bend at January's pace and is moving
   fastest when it hits June. The deck ease would do the opposite. */
.mlc-climb {
  stroke-dashoffset: 1;
  transition: stroke-dashoffset calc(var(--motion-draw) * 1.5)
    cubic-bezier(0.6, 0.05, 0.8, 0.5);
}

svg.is-bent .mlc-climb {
  stroke-dashoffset: 0;
}

/* The fill grows in under the climb rather than with the flat year — the area
   is the volume of merged work, and almost all of it belongs to this beat. */
.mlc-area {
  fill: url(#mlc-grad);
  opacity: 0;
  transition: opacity var(--motion-slow) var(--motion-ease) 400ms;
}

svg.is-bent .mlc-area {
  opacity: 1;
}

/* Peak dot and label land as the climb finishes its draw. */
.mlc-end {
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

svg.is-bent .mlc-end {
  opacity: 1;
  transition-delay: calc(var(--motion-draw) * 1.5);
}

/* Backward navigation is instant, matching the deck's global reveal rule.
   Whole selector inside :global() — the scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops what follows it. */
:global(.slidev-nav-go-backward .mlc-climb),
:global(.slidev-nav-go-backward .mlc-area),
:global(.slidev-nav-go-backward .mlc-end) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}

.mlc-drop {
  stroke: var(--brand-primary);
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0.35;
}

.mlc-halo {
  fill: var(--brand-primary);
  fill-opacity: 0.15;
}

.mlc-end circle {
  fill: var(--brand-primary);
}

/* The 880-unit viewBox renders at 768px (`max-w-3xl`), a 0.87 scale — these
   sizes are set for what survives projection, matching the deck's other charts. */
.mlc-end-value {
  font-size: 22px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.mlc-end-date {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}

.mlc-ticks text {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}
</style>
