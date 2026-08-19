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
const H = 340
const PAD_L = 28
const PAD_R = 64
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

const peakX = px(PEAK_INDEX)
const peakY = py(MONTHLY[PEAK_INDEX])
const baseY = H - PAD_B

/* The climb's numbers are written on the curve — but selectively, not one per
   point: seven labels in the climb's quarter of the frame collide however
   they're placed, and 863 and 1,347 only echo their neighbours (the plateau
   partner, the peak's twin). The months that carry the story keep their
   counts: the bend, the doubling, the month that out-merged the prior year,
   the peak, and now. Jan and Feb sit right of their points inside the bend,
   dy-staggered so they don't read as a pair; Mar is clear enough above for a
   centred label; July hangs right of the endpoint. The labels carry a
   background-colour halo (paint-order stroke) as insurance where a segment
   passes close. */
const LABEL_SPEC = [
  { i: 16, dx: 8, dy: 12, anchor: 'start' }, // Jan — the bend
  { i: 17, dx: 8, dy: 6, anchor: 'start' }, // Feb — the doubling
  { i: 18, dx: 0, dy: -14, anchor: 'middle' }, // Mar — out-merged the prior year
  { i: PEAK_INDEX, dx: 0, dy: -18, anchor: 'middle', peak: true },
  { i: 22, dx: 10, dy: 5, anchor: 'start' }, // Jul — the endpoint, "now"
]
const climbLabels = LABEL_SPEC.map(s => ({
  ...s,
  v: MONTHLY[s.i],
  x: px(s.i) + s.dx,
  y: py(MONTHLY[s.i]) + s.dy,
}))

// The flat year's counterpart to the peak label: same period, other scale.
// 475 merges over the 16 months before the bend ≈ 30 a month. Centred over
// the flat span, close enough to the line to read as labeling it.
const avgX = px(7.5)

// Two recessive gridlines so the two callout numbers have a scale between
// them — without one, the flat year reads as literally zero and 1,354 is
// just a word. Values, not a full axis: the chart stays annotation-first.
const GRID = [500, 1000]

// The moment the title names. A dashed rule at January 2026, landing with
// the climb, so "bent in January" is a place on the chart, not homework.
const bendX = px(BEND_INDEX + 1)

// Calendar-quarter rhythm, each tick at its true position on the linear
// axis. The series itself starts at September 2024 — the first data point
// simply sits one step left of the first labeled tick.
const ticks = [
  { i: 1, label: "Oct '24" },
  { i: 4, label: "Jan '25" },
  { i: 7, label: "Apr '25" },
  { i: 10, label: "Jul '25" },
  { i: 13, label: "Oct '25" },
  { i: 16, label: "Jan '26", bend: true },
  { i: 19, label: "Apr '26" },
  { i: 22, label: "Jul '26" },
]

// Reads the slide's click state without consuming clicks: the climb is the
// slide's first beat after arrival, so it rides click 1 as a transition —
// reversible on step-back, stepped correctly in export.
const { $clicks } = useSlideContext()
const bent = computed(() => ($clicks?.value ?? 0) >= 1)
</script>

<template>
  <figure class="mx-auto w-full max-w-4xl merge-ledger">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'is-bent': bent }"
      role="img"
      aria-label="Pull requests merged per month across GitHub and GitLab: between 3 and 65 a month through December 2025, bending sharply upward in January 2026 and peaking at 1,354 in June 2026"
    >
      <!-- The unit, named once, rate included: the point labels are bare
           counts, so the axis title has to carry "per month" for them.
           Top-left is the one corner the curve never reaches. -->
      <text class="mlc-unit" :x="PAD_L" y="22">Merged pull requests per month</text>

      <line class="mlc-baseline" :x1="PAD_L" :y1="baseY" :x2="W - PAD_R + 40" :y2="baseY" />

      <g v-for="g in GRID" :key="g" class="mlc-grid">
        <line :x1="PAD_L" :y1="py(g)" :x2="W - PAD_R + 40" :y2="py(g)" />
        <text :x="PAD_L" :y="py(g) - 6">{{ g.toLocaleString('en-US') }}</text>
      </g>

      <g class="mlc-ticks">
        <text
          v-for="t in ticks"
          :key="t.label"
          :x="px(t.i)"
          :y="baseY + 24"
          text-anchor="middle"
          :class="{ 'mlc-tick-bend': t.bend }"
        >
          {{ t.label }}
        </text>
      </g>

      <line class="mlc-bend" :x1="bendX" :y1="baseY" :x2="bendX" :y2="CURVE_TOP" />

      <path class="mlc-flat" :d="flatPath" pathLength="1" />
      <path class="mlc-climb" :d="climbPath" pathLength="1" />

      <text class="mlc-avg" :x="avgX" :y="baseY - 20" text-anchor="middle">~30 / month</text>

      <g class="mlc-end">
        <circle class="mlc-halo" :cx="peakX" :cy="peakY" r="11" />
        <circle :cx="peakX" :cy="peakY" r="5" />
        <text class="mlc-end-date" :x="peakX" :y="peakY - 38" text-anchor="middle">June 2026</text>
        <text
          v-for="l in climbLabels"
          :key="l.v"
          class="mlc-val"
          :class="{ 'mlc-val-peak': l.peak }"
          :x="l.x"
          :y="l.y"
          :text-anchor="l.anchor"
        >
          {{ l.v.toLocaleString('en-US') }}
        </text>
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

/* Recessive scale cues — present on arrival like the rest of the chrome, and
   faint enough that the line stays the loudest thing on the chart. */
.mlc-grid line {
  stroke: var(--brand-text);
  stroke-width: 1;
  opacity: 0.12;
}

.mlc-grid text {
  font-size: 15px;
  fill: var(--brand-text);
  opacity: 0.5;
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

/* Point labels, peak dot and date land as the climb finishes its draw. */
.mlc-end {
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

svg.is-bent .mlc-end {
  opacity: 1;
  transition-delay: calc(var(--motion-draw) * 1.5);
}

/* The bend marker rides the same click as the climb, arriving as the line
   leaves the floor — it marks where the climb begins, so it can't precede it. */
.mlc-bend {
  stroke: var(--brand-text);
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0;
  transition: opacity var(--motion-slow) var(--motion-ease);
}

svg.is-bent .mlc-bend {
  opacity: 0.35;
}

svg.is-bent .mlc-tick-bend {
  opacity: 0.95;
  font-weight: 600;
}

/* Backward navigation is instant, matching the deck's global reveal rule.
   Whole selector inside :global() — the scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops what follows it. */
:global(.slidev-nav-go-backward .mlc-climb),
:global(.slidev-nav-go-backward .mlc-end),
:global(.slidev-nav-go-backward .mlc-bend),
:global(.slidev-nav-go-backward .mlc-tick-bend) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}

.mlc-halo {
  fill: var(--brand-primary);
  fill-opacity: 0.15;
}

.mlc-end circle {
  fill: var(--brand-primary);
}

/* The 880-unit viewBox renders near 1:1 (`max-w-4xl`, capped by the layout
   padding) — these sizes are set for what survives projection, matching the
   deck's other charts.
   The halo stroke is the page colour under the glyphs (paint-order), so a label
   stays legible where the bend rule or a steep segment runs behind it. */
.mlc-val {
  font-size: 15px;
  fill: var(--brand-text);
  opacity: 0.75;
  stroke: var(--brand-bg);
  stroke-width: 4;
  paint-order: stroke;
  stroke-linejoin: round;
}

.mlc-val-peak {
  font-size: 20px;
  font-weight: 700;
  fill: var(--brand-primary);
  opacity: 1;
}

.mlc-end-date {
  font-size: 15px;
  fill: var(--brand-text);
  opacity: 0.65;
}

.mlc-ticks text {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}

.mlc-tick-bend {
  transition: opacity var(--motion-slow) var(--motion-ease);
}

/* Chart chrome, like the ticks: present on arrival, unanimated — the build is
   the line's story, and the unit has to be readable before it starts. */
.mlc-unit {
  font-size: 18px;
  fill: var(--brand-text);
  opacity: 0.65;
}
</style>
