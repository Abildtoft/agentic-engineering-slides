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

const chips = [
  { label: 'Specs', x: 280, y: 96 },
  { label: 'Implementation', x: 422, y: 96 },
  { label: 'Testing', x: 571, y: 96 },
  { label: 'Integration', x: 293, y: 148 },
  { label: 'Handoffs', x: 425, y: 148 },
  { label: 'Coordination', x: 561, y: 148 },
]

const chipWidth = (label) => label.length * 7.4 + 26
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-4 software-middle', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 880 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Idea flows into a large middle stage of specs, implementation, testing, integration, handoffs and coordination, then out as shipped product. The middle is where most of the effort goes."
    >
      <defs>
        <marker
          id="sm-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="sm-arrowhead" />
        </marker>
      </defs>

      <g class="sm-step" style="--i: 0">
        <rect x="24" y="103" width="110" height="44" rx="6" class="sm-node" />
        <text x="79" y="130" text-anchor="middle" class="sm-label">Idea</text>
      </g>

      <line class="sm-step" style="--i: 1" x1="142" y1="125" x2="192" y2="125" marker-end="url(#sm-arrow)" />

      <g class="sm-step" style="--i: 2">
        <rect x="204" y="34" width="452" height="182" rx="10" class="sm-middle" />
        <text x="430" y="66" text-anchor="middle" class="sm-eyebrow" letter-spacing="2">THE MIDDLE</text>
        <text x="430" y="200" text-anchor="middle" class="sm-sub">where most of the time, attention, and craft goes</text>
      </g>

      <g
        v-for="(c, i) in chips"
        :key="c.label"
        class="sm-step"
        :style="`--i: ${3 + i}`"
      >
        <rect
          :x="c.x - chipWidth(c.label) / 2"
          :y="c.y - 16"
          :width="chipWidth(c.label)"
          height="32"
          rx="16"
          class="sm-chip"
        />
        <text :x="c.x" :y="c.y + 5" text-anchor="middle" class="sm-chip-label">{{ c.label }}</text>
      </g>

      <line class="sm-step" style="--i: 9" x1="664" y1="125" x2="714" y2="125" marker-end="url(#sm-arrow)" />

      <g class="sm-step" style="--i: 10">
        <rect x="726" y="103" width="134" height="44" rx="6" class="sm-node" />
        <text x="793" y="124" text-anchor="middle" class="sm-label">Shipped</text>
        <text x="793" y="139" text-anchor="middle" class="sm-label sm-label--sub">product</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.software-middle svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.sm-node {
  fill: var(--brand-primary);
  fill-opacity: 0.07;
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.sm-middle {
  fill: var(--brand-primary);
  fill-opacity: 0.05;
  stroke: var(--brand-primary);
  stroke-width: 1.5;
  stroke-dasharray: 7 5;
}

.sm-chip {
  fill: var(--brand-primary);
  fill-opacity: 0.12;
  stroke: var(--brand-primary);
  stroke-width: 1.25;
}

.sm-eyebrow {
  font-size: 14px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.sm-sub {
  font-size: 12px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.6;
}

.sm-label {
  font-size: 14px;
  font-weight: 600;
  fill: var(--brand-text);
}

.sm-label--sub {
  font-weight: 400;
}

.sm-chip-label {
  font-size: 13px;
  fill: var(--brand-text);
}

line.sm-step {
  stroke: var(--brand-text);
  stroke-width: 1.5;
  opacity: 0.55;
}

.sm-arrowhead {
  fill: var(--brand-text);
  fill-opacity: 0.55;
}

/* Staggered entrance, left to right on the flow, same beat as MermaidDiagram's
   node build — with the deck's standard rise. Hidden state lives in the
   keyframe's `from`, so print and reduced motion land fully drawn. */
.sm-step {
  animation: sm-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 90ms);
}

@keyframes sm-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}
</style>
