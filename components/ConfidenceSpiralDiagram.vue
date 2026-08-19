<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'lg' },
})

const sizeClasses = {
  sm: 'w-full max-w-xl',
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}

// The loop's six states, descending. The x positions swing around a centre
// with shrinking amplitude — the spiral tightens as understanding drains.
//
// `reach` is when the curve's tip arrives at this pill, as a fraction of the
// draw's duration. The draw runs on --motion-ease, which decelerates, so it is
// E⁻¹(p) for cubic-bezier(0.22, 0.61, 0.36, 1) at the pill's arc-length
// fraction along the Catmull-Rom path (segment lengths sampled numerically:
// 239, 222, 203, 170, 138, 61 units → cumulative p of 0, 0.231, 0.447, 0.643,
// 0.808, 0.942). Recompute if a pill moves, the tension changes, or the ease
// changes.
const steps = [
  { label: 'AI writes code', x: 340, y: 40, reach: 0 },
  { label: 'You don’t fully understand it', x: 570, y: 88, reach: 0.085 },
  { label: 'Something breaks', x: 360, y: 136, reach: 0.174 },
  { label: 'You prompt again', x: 550, y: 184, reach: 0.28 },
  { label: 'You understand less', x: 395, y: 232, reach: 0.417 },
  { label: 'You defer more', x: 515, y: 280, reach: 0.634 },
]

/* ~8px per character fits the 15px label size below. */
const pillWidth = (label) => label.length * 8 + 28

// Catmull-Rom through the pill centres (plus a continuation point past the
// last one), converted to cubic beziers: one flowing curve, drawn behind the
// pills, that keeps descending after the final state. The /3.2 tension is
// deliberately loose — at /6 the curve degenerates into near-straight
// diagonals and stops reading as a spiral.
const TAIL = { x: 560, y: 318 }

const spiralPath = computed(() => {
  const pts = [steps[0], ...steps.map(s => ({ x: s.x, y: s.y })), TAIL, TAIL]
  let d = `M ${pts[1].x} ${pts[1].y}`
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2]
    const c1x = p1.x + (p2.x - p0.x) / 3.2
    const c1y = p1.y + (p2.y - p0.y) / 3.2
    const c2x = p2.x - (p3.x - p1.x) / 3.2
    const c2y = p2.y - (p3.y - p1.y) / 3.2
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`
  }
  return d
})
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-4 confidence-spiral', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 880 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A tightening downward spiral through six states: AI writes code, you don't fully understand it, something breaks, you prompt again, you understand less, you defer more — and the loop continues. An axis shows understanding decreasing on the way down."
    >
      <defs>
        <marker
          id="cs-axis-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="cs-axis-head" />
        </marker>
      </defs>

      <!-- The arrow points toward *less*: axis-arrow convention reads the
           arrowhead as the direction of increase, so the label names the thing
           that grows on the way down. -->
      <g class="cs-axis">
        <line x1="130" y1="52" x2="130" y2="302" marker-end="url(#cs-axis-arrow)" />
        <text transform="translate(112, 177) rotate(-90)" text-anchor="middle" letter-spacing="2">
          LESS UNDERSTANDING
        </text>
      </g>

      <path :d="spiralPath" pathLength="1" class="cs-path" />

      <g
        v-for="(s, i) in steps"
        :key="s.label"
        class="cs-step"
        :style="`--reach: ${s.reach}; --d: ${i}`"
      >
        <rect
          :x="s.x - pillWidth(s.label) / 2"
          :y="s.y - 17"
          :width="pillWidth(s.label)"
          height="34"
          rx="17"
          class="cs-pill"
        />
        <text :x="s.x" :y="s.y + 5" text-anchor="middle" class="cs-label">{{ s.label }}</text>
      </g>

      <!-- Its own polygon, not a marker: a marker sits at the path's end from
           the start, ignoring the dash draw. Arrives once the draw lands. -->
      <g class="cs-tail">
        <polygon points="553,314 561,326 567,313" class="cs-tail-head" />
        <text x="585" y="326" class="cs-tail-label">and the loop tightens</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.confidence-spiral svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.cs-axis line {
  stroke: var(--brand-primary);
  stroke-width: 1.5;
  opacity: 0.55;
}

.cs-axis-head {
  fill: var(--brand-primary);
  fill-opacity: 0.55;
}

/* 15px to match the pill labels: at the call site's 0.76 scale anything
   smaller lands under ~10px effective. */
.cs-axis text {
  font-size: 15px;
  font-weight: 700;
  fill: var(--brand-primary);
  opacity: 0.6;
}

.cs-path {
  fill: none;
  stroke: var(--brand-primary);
  stroke-width: 2;
  opacity: 0.7;
  /* Fully drawn is the base state — the draw lives in the keyframe's `from`,
     so print and reduced motion land complete. */
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: cs-draw var(--motion-draw) var(--motion-ease) both;
  animation-delay: 150ms;
}

.cs-pill {
  fill: var(--brand-bg, #ffffff);
  /* Each step sits deeper in the spiral: the tint strengthens 4% per level.
     Mixed against the opaque background rather than a fill-opacity tint, so
     the curve behind the pill stays masked. Browsers without color-mix keep
     the plain background fill above. */
  fill: color-mix(in srgb, var(--brand-primary) calc(var(--d) * 4%), var(--brand-bg, #ffffff));
  stroke: var(--brand-primary);
  stroke-width: 1.25;
}

/* The 880-unit viewBox renders at 672px (`md`), a 0.76 scale — sized for what
   survives that scale on a projector. */
.cs-label {
  font-size: 15px;
  fill: var(--brand-text);
}

/* Pills land in step with the draw's tip passing through them: each carries
   `--reach`, the eased draw's time fraction at its position on the curve (the
   E⁻¹ table above the steps array). 150ms is the draw's own start delay. */
.cs-step {
  animation: cs-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(150ms + var(--reach) * var(--motion-draw));
}

.cs-axis {
  animation: cs-in var(--motion-slow) var(--motion-ease) both;
}

.cs-tail {
  animation: cs-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(150ms + var(--motion-draw));
}

.cs-tail-head {
  fill: var(--brand-primary);
}

.cs-tail-label {
  font-size: 15px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.65;
}

@keyframes cs-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

@keyframes cs-draw {
  from {
    stroke-dashoffset: 1;
  }
}
</style>
