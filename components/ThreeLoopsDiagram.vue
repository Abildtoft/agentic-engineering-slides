<script setup>
const props = defineProps({
  size: { type: String, default: 'lg' },
})

const sizeClasses = {
  sm: 'w-full max-w-xl',
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}

/* Three nested loops, drawn as three nested rings: the agent's cycle runs
   inside the developer's, which runs inside the market's. Nesting is the
   point — Ng's loops are not a pipeline of three boxes — and the ring shape
   echoes the constraint ring from Section 3.

   Each ring's readable content lives in its top band (the 88-unit strip its
   rect adds above the next one in); the innermost ring owns its whole box.
   Small arrowheads sit on each rect's stroke — top edge running right, bottom
   edge running left — so every rectangle reads as a circulation, not a
   container. */
const rings = [
  {
    key: 'external',
    rect: { x: 16, y: 14, w: 848, h: 372, rx: 18 },
    title: 'EXTERNAL FEEDBACK',
    cadence: 'hours to weeks',
    steps: 'Release → Observe users → Update direction',
    titleX: 40,
    cadenceX: 840,
    baseline: 48,
    stepsY: 78,
    topArrowX: 640,
    bottomArrowX: 280,
  },
  {
    key: 'developer',
    rect: { x: 96, y: 102, w: 688, h: 268, rx: 14 },
    title: 'DEVELOPER FEEDBACK',
    cadence: 'tens of minutes to hours',
    steps: 'Product vision → Review product → Refine spec + steer',
    titleX: 120,
    // Ends at 700, not the band edge: the outer→developer inward arrow crosses
    // the boundary at x=740 and needs the corridor clear.
    cadenceX: 700,
    baseline: 136,
    stepsY: 166,
    topArrowX: 600,
    bottomArrowX: 300,
  },
]

// The innermost loop is laid out centred in its own box rather than in a band.
const inner = {
  rect: { x: 176, y: 190, w: 528, h: 164, rx: 12 },
  title: 'AGENTIC CODING',
  cadence: 'minutes',
  steps: 'Spec + evals → Build → Test + inspect',
  cx: 440,
  topArrowX: 560,
  bottomArrowX: 320,
}

const rightArrow = x => `${x - 7},${-4.5} ${x - 7},${4.5} ${x + 7},0`
const leftArrow = x => `${x + 7},${-4.5} ${x + 7},${4.5} ${x - 7},0`
</script>

<template>
  <figure :class="['mx-auto mt-2 three-loops', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 880 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three nested feedback loops at three cadences: an outer external-feedback loop running in hours to weeks (release, observe users, update direction), a developer-feedback loop inside it running in tens of minutes to hours (product vision, review product, refine spec and steer), and an agentic coding loop at the centre running in minutes (spec and evals, build, test and inspect). Dotted arrows show information flowing inward: external evidence shapes the vision, developer judgment shapes the spec."
    >
      <g
        v-for="(r, i) in rings"
        :key="r.key"
        class="tl-ring"
        :style="`--i: ${i}`"
      >
        <rect
          :x="r.rect.x"
          :y="r.rect.y"
          :width="r.rect.w"
          :height="r.rect.h"
          :rx="r.rect.rx"
          class="tl-rect"
        />
        <polygon
          class="tl-flow"
          :points="rightArrow(r.topArrowX)"
          :transform="`translate(0 ${r.rect.y})`"
        />
        <polygon
          class="tl-flow"
          :points="leftArrow(r.bottomArrowX)"
          :transform="`translate(0 ${r.rect.y + r.rect.h})`"
        />
        <text class="tl-title" :x="r.titleX" :y="r.baseline" letter-spacing="1.5">{{ r.title }}</text>
        <text class="tl-cadence" :x="r.cadenceX" :y="r.baseline" text-anchor="end">{{ r.cadence }}</text>
        <text class="tl-steps" :x="r.titleX" :y="r.stepsY">{{ r.steps }}</text>
      </g>

      <g class="tl-ring" style="--i: 2">
        <rect
          :x="inner.rect.x"
          :y="inner.rect.y"
          :width="inner.rect.w"
          :height="inner.rect.h"
          :rx="inner.rect.rx"
          class="tl-rect tl-rect--inner"
        />
        <polygon
          class="tl-flow"
          :points="rightArrow(inner.topArrowX)"
          :transform="`translate(0 ${inner.rect.y})`"
        />
        <polygon
          class="tl-flow"
          :points="leftArrow(inner.bottomArrowX)"
          :transform="`translate(0 ${inner.rect.y + inner.rect.h})`"
        />
        <text class="tl-title" :x="inner.cx" :y="240" text-anchor="middle" letter-spacing="1.5">{{ inner.title }}</text>
        <text class="tl-cadence" :x="inner.cx" :y="268" text-anchor="middle">{{ inner.cadence }}</text>
        <text class="tl-steps" :x="inner.cx" :y="298" text-anchor="middle">{{ inner.steps }}</text>
      </g>

      <!-- Information flows inward: evidence shapes vision, judgment shapes the
           spec. Positioned right of the band text, clear of every label. -->
      <g class="tl-ring tl-inward" style="--i: 3">
        <line x1="740" y1="80" x2="740" y2="118" />
        <polygon points="735.5,116 744.5,116 740,128" />
      </g>
      <g class="tl-ring tl-inward" style="--i: 4">
        <line x1="660" y1="168" x2="660" y2="206" />
        <polygon points="655.5,204 664.5,204 660,216" />
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.three-loops svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.tl-rect {
  fill: var(--brand-primary);
  fill-opacity: 0.04;
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.tl-rect--inner {
  fill-opacity: 0.09;
}

.tl-flow {
  fill: var(--brand-primary);
}

.tl-title {
  font-size: 15px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.tl-cadence {
  font-size: 15px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.65;
}

.tl-steps {
  font-size: 15px;
  fill: var(--brand-text);
  opacity: 0.85;
}

.tl-inward line {
  stroke: var(--brand-text);
  stroke-width: 1.5;
  stroke-dasharray: 2 5;
  opacity: 0.55;
}

.tl-inward polygon {
  fill: var(--brand-text);
  fill-opacity: 0.55;
}

/* Staggered entrance, outermost ring first — the slowest clock frames the
   picture, then the loops arrive inward, then the inward flows. Hidden state
   lives in the keyframe's `from`, so print and reduced motion land fully
   drawn. */
.tl-ring {
  animation: tl-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 140ms);
}

@keyframes tl-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}
</style>
