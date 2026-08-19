<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'lg' },
})

const sizeClasses = {
  sm: 'w-full max-w-xl',
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}

/* The curve is the argument: every workflow a team runs, ranked by payoff. A
   handful of big ones on the left, then a long tail of small ones — and a
   horizontal build threshold deciding which ever become software. */
/* Vertically tight on purpose: the slide carries a heading, an intro line and
   two click paragraphs around this figure, and at the original 272-unit height
   the last paragraph bottomed out 4px past the 552px slide frame (measured). */
const W = 880
const H = 254
const BASE = 222 // baseline y
const X0 = 60
const X1 = 840
const AMP = 172
const TAU = 170

const yAt = x => BASE - AMP * Math.exp(-(x - X0) / TAU)
const xCross = y => X0 + TAU * Math.log(AMP / (BASE - y))

const OLD_Y = 124 // the historical threshold — "worth a developer's time"
const NEW_Y = 198 // where agentic production cost puts it
const DROP = NEW_Y - OLD_Y

const oldX = xCross(OLD_Y)
const newX = xCross(NEW_Y)

const curvePoints = []
for (let x = X0; x <= X1; x += 8) curvePoints.push([x, yAt(x)])
const toPath = pts =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
const curvePath = toPath(curvePoints)

// The head: workflows above the old threshold — the roadmap that always existed.
const headPts = curvePoints.filter(([x]) => x <= oldX)
headPts.push([oldX, OLD_Y])
const headPath = `${toPath(headPts)} L ${X0} ${OLD_Y} Z`

// The newly buildable band: above the dropped threshold, below the old one.
const backlogPts = curvePoints.filter(([x]) => x >= oldX && x <= newX)
backlogPts.unshift([oldX, OLD_Y])
backlogPts.push([newX, NEW_Y])
const backlogPath = `${toPath(backlogPts)} L ${oldX.toFixed(1)} ${NEW_Y} Z`

// Reads the slide's click state without consuming clicks: the threshold drops
// with the slide's second click — the same click that lands the line naming
// the drop — as a transition: reversible, stepped correctly in export.
const { $clicks } = useSlideContext()
const dropped = computed(() => ($clicks?.value ?? 0) >= 2)

const dropPx = `${DROP}px`
</script>

<template>
  <figure :class="['mx-auto mt-0 long-tail', sizeClasses[size] || sizeClasses.lg]">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'is-dropped': dropped }"
      role="img"
      aria-label="A long-tail curve of every internal workflow ranked by payoff. A horizontal build threshold cuts it: only the short head was ever worth a project. When the threshold drops, a wide band of the tail — the backlog nobody wrote down — becomes buildable."
    >
      <!-- Axes -->
      <line class="lt-axis" :x1="X0 - 12" :y1="BASE" :x2="X1 + 12" :y2="BASE" />
      <text class="lt-axis-label" :x="(X0 + X1) / 2" :y="BASE + 24" text-anchor="middle">
        every internal workflow, ranked by payoff
      </text>

      <!-- The head that always cleared the bar. Its label sits in the clear
           space above the curve's descent — both wedge fills are too steep for
           horizontal text to sit inside without the curve slicing it. -->
      <g class="lt-head">
        <path class="lt-fill" :d="headPath" />
        <text class="lt-region-label" :x="X0 + 15" :y="42">the roadmap</text>
      </g>

      <!-- The curve draws itself on entry -->
      <path class="lt-curve" :d="curvePath" pathLength="1" />

      <!-- Ghost of the old threshold: appears when the live one drops, so the
           distance travelled stays on screen. -->
      <line class="lt-ghost" :x1="X0 - 12" :y1="OLD_Y" :x2="X1 + 12" :y2="OLD_Y" />

      <!-- The threshold. The group carries the drop as a CSS transform, so the
           line and its label travel together. -->
      <g class="lt-threshold">
        <line :x1="X0 - 12" :y1="OLD_Y" :x2="X1 + 12" :y2="OLD_Y" />
        <text :x="X1 + 10" :y="OLD_Y - 10" text-anchor="end">the build threshold</text>
      </g>

      <!-- The newly buildable band. Label in the strip just under the dropped
           threshold rather than inside the band — the wedge narrows to a few
           pixels on its right, so interior text would cross the curve. -->
      <g class="lt-backlog">
        <path class="lt-fill lt-fill--new" :d="backlogPath" />
        <text class="lt-region-label lt-region-label--new" :x="(oldX + newX) / 2" :y="NEW_Y + 17" text-anchor="middle">
          the backlog nobody wrote down
        </text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.long-tail svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.lt-axis {
  stroke: var(--brand-text);
  stroke-width: 1;
  opacity: 0.3;
}

.lt-axis-label {
  font-size: 15px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.55;
}

.lt-curve {
  fill: none;
  stroke: var(--brand-primary);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: lt-draw var(--motion-draw) var(--motion-ease);
}

@keyframes lt-draw {
  from {
    stroke-dashoffset: 1;
  }
}

/* Threshold, head fill and labels land once the curve has finished drawing —
   hidden through their delay via `backwards`, fully visible with animation
   off (print, reduced motion). */
.lt-threshold,
.lt-head {
  animation: lt-fade var(--motion-slow) var(--motion-ease) var(--motion-draw) backwards;
}

@keyframes lt-fade {
  from {
    opacity: 0;
  }
}

.lt-threshold line {
  stroke: var(--brand-primary);
  stroke-width: 2;
  stroke-dasharray: 8 6;
}

.lt-threshold text {
  font-size: 15px;
  font-weight: 600;
  fill: var(--brand-primary);
}

/* The drop rides the slide's second click as a transition — reversible on
   step-back, stepped correctly in export. Slow token: the drop IS the beat. */
.lt-threshold {
  transition: transform var(--motion-slow) var(--motion-ease);
}

svg.is-dropped .lt-threshold {
  transform: translateY(v-bind(dropPx));
}

.lt-ghost {
  stroke: var(--brand-primary);
  stroke-width: 1.5;
  stroke-dasharray: 3 7;
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

svg.is-dropped .lt-ghost {
  opacity: 0.3;
}

.lt-fill {
  fill: var(--brand-primary);
  fill-opacity: 0.14;
}

.lt-region-label {
  font-size: 15px;
  font-weight: 600;
  fill: var(--brand-text);
  opacity: 0.75;
}

/* The band fades in after the threshold has landed on top of it. */
.lt-backlog {
  opacity: 0;
  transition: opacity var(--motion-slow) var(--motion-ease) var(--motion-base);
}

svg.is-dropped .lt-backlog {
  opacity: 1;
}

.lt-region-label--new {
  font-style: italic;
}

/* Backward navigation is instant, matching the deck's global reveal rule.
   Whole selector inside :global() — the scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops what follows it. */
:global(.slidev-nav-go-backward .lt-threshold),
:global(.slidev-nav-go-backward .lt-ghost),
:global(.slidev-nav-go-backward .lt-backlog) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
