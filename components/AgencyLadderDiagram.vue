<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'md' },
  caption: { type: String, default: '' },
})

const { $clicks } = useSlideContext()
// The tide reveals together with the slide's first v-click element.
const flooded = computed(() => ($clicks?.value ?? 0) >= 1)

const STEP_W = 110
const BASE_Y = 380
const RISE = 40

const rungs = [
  { n: 1, name: 'Flag', quote: ['“There’s a problem.”'] },
  { n: 2, name: 'Execute', quote: ['“Hand me the fix —', 'I’ll ship it.”'] },
  { n: 3, name: 'Diagnose', quote: ['“Here’s the problem,', 'and the cause.”'] },
  { n: 4, name: 'Propose', quote: ['“…and a few ways', 'to fix it.”'] },
  { n: 5, name: 'Recommend', quote: ['“…and here’s the', 'one I’d pick.”'] },
  { n: 6, name: 'Resolve', quote: ['“Found it. Fixed it.', 'Looping you in.”'] },
  { n: 7, name: 'Discern', quote: ['“Found it. Not worth', 'fixing. Moving on.”'] },
].map(r => ({
  ...r,
  x: 45 + (r.n - 1) * STEP_W,
  cx: 45 + (r.n - 1) * STEP_W + 53,
  top: BASE_Y - RISE * r.n,
}))

/* `md` is deliberately a step wider than the other diagrams' md: the seven rung
   quotes are half this diagram's content, and at max-w-2xl they render ~8px. */
const sizeClasses = {
  sm: 'w-full max-w-2xl',
  md: 'w-full max-w-3xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-2 agency-ladder', sizeClasses[size] || sizeClasses.md]">
    <svg
      viewBox="0 0 860 452"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Agency Ladder: seven steps from Flag to Discern. A tide labeled 'agents run these' covers steps one through six, leaving only Discern above water."
    >
      <defs>
        <marker
          id="al-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-text)" fill-opacity="0.5" />
        </marker>
      </defs>

      <g class="al-arrow-group" :class="{ 'al-arrow-faded': flooded }">
        <line
          x1="90"
          y1="293"
          x2="600"
          y2="108"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          opacity="0.5"
          marker-end="url(#al-arrow)"
        />
        <text
          class="al-axis"
          transform="translate(335, 182) rotate(-20)"
          text-anchor="middle"
          opacity="0.55"
          letter-spacing="2"
        >
          MORE AGENCY
        </text>
      </g>

      <g
        v-for="r in rungs"
        :key="r.n"
        class="al-rung"
        :class="{ 'al-dim': flooded && r.n < 7 }"
      >
        <!-- Inner group carries the slide-entry rise; the outer one carries the
             click-driven dim. Separate elements, so the entry animation never
             fights the transition for opacity. -->
        <g class="al-enter" :style="`--i: ${r.n - 1}`">
        <rect
          :x="r.x"
          :y="r.top"
          width="106"
          :height="BASE_Y - r.top"
          rx="4"
          :style="{
            fill: r.n === 7 ? 'var(--brand-primary)' : 'var(--brand-text)',
            stroke: r.n === 7 ? 'var(--brand-primary)' : 'var(--brand-text)',
          }"
          :fill-opacity="r.n === 7 ? (flooded ? 0.3 : 0.18) : 0.07"
          :stroke-opacity="r.n === 7 ? 1 : 0.55"
          :stroke-width="r.n === 7 ? 1.5 : 1.25"
          class="al-step"
        />
        <text
          class="al-number"
          :x="r.cx"
          :y="r.top + 27"
          text-anchor="middle"
          :style="{ fill: r.n === 7 ? 'var(--brand-primary)' : 'var(--brand-text)' }"
        >
          {{ r.n }}
        </text>
        <text
          class="al-name"
          :x="r.cx"
          y="402"
          text-anchor="middle"
          :style="{ fill: r.n === 7 ? 'var(--brand-primary)' : 'var(--brand-text)' }"
        >
          {{ r.name }}
        </text>
        <text
          v-for="(line, i) in r.quote"
          :key="i"
          class="al-quote"
          :x="r.cx"
          :y="r.quote.length === 1 ? 425 : 418 + i * 15"
          text-anchor="middle"
          opacity="0.65"
        >
          {{ line }}
        </text>
        </g>
      </g>

      <line
        x1="38"
        y1="380"
        x2="822"
        y2="380"
        style="stroke: var(--brand-text)"
        stroke-width="1"
        opacity="0.35"
      />

      <g class="al-tide" :class="{ 'al-tide-visible': flooded }">
        <rect x="38" y="132" width="665" height="248" style="fill: var(--brand-primary)" fill-opacity="0.12" />
        <line
          x1="38"
          y1="132"
          x2="703"
          y2="132"
          style="stroke: var(--brand-primary)"
          stroke-width="2"
          stroke-dasharray="10 6"
          opacity="0.85"
        />
        <text
          class="al-tide-label"
          x="263"
          y="172"
          text-anchor="middle"
          letter-spacing="2"
        >
          AGENTS RUN THESE
        </text>
        <text
          class="al-tide-sub"
          x="263"
          y="192"
          text-anchor="middle"
          opacity="0.75"
        >
          cheap — and getting cheaper
        </text>
      </g>

      <!-- Baseline sits 6 units above the viewBox floor so the italic
           descenders ("y" in Addy) don't clip at the SVG edge. -->
      <text
        class="al-credit"
        x="822"
        y="446"
        text-anchor="end"
        opacity="0.5"
      >
        after Addy Osmani
      </text>
    </svg>

    <figcaption v-if="caption" class="agency-ladder__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.agency-ladder :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.agency-ladder :deep(svg) .al-rung {
  transition: opacity var(--motion-base) var(--motion-ease);
}

.agency-ladder :deep(svg) .al-arrow-group {
  transition: opacity var(--motion-base) var(--motion-ease);
}

/* Slide entry: the rungs rise 1 → 7 on the deck's 90ms beat — the diagram's own
   climb, enacted. Hidden state lives in the keyframe's `from`, so print and
   reduced motion land complete. */
.agency-ladder :deep(svg) .al-enter {
  animation: al-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 90ms);
}

@keyframes al-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

/* Fully hidden once the tide is up: at a residual opacity the rotated axis
   label bleeds through the tide's own label as stray ghost letters. */
.agency-ladder :deep(svg) .al-arrow-faded {
  opacity: 0;
}

.agency-ladder :deep(svg) .al-dim {
  opacity: 0.45;
}

.agency-ladder :deep(svg) .al-step {
  transition: fill-opacity var(--motion-base) var(--motion-ease);
}

.agency-ladder :deep(svg) .al-tide {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity var(--motion-slow) var(--motion-ease),
    transform var(--motion-slow) var(--motion-ease);
}

.agency-ladder :deep(svg) .al-tide-visible {
  opacity: 1;
  transform: translateY(0);
}

/* The 860-unit viewBox renders at 768px (`md`), a 0.89 scale — sizes are set
   for what survives that scale on a projector. */
.agency-ladder :deep(svg) .al-axis {
  font-size: 12px;
  font-weight: 600;
  fill: var(--brand-text);
}

.agency-ladder :deep(svg) .al-number {
  font-size: 19px;
  font-weight: 700;
}

.agency-ladder :deep(svg) .al-name {
  font-size: 14px;
  font-weight: 700;
}

.agency-ladder :deep(svg) .al-quote {
  font-size: 12px;
  font-style: italic;
  fill: var(--brand-text);
}

.agency-ladder :deep(svg) .al-tide-label {
  font-size: 15px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.agency-ladder :deep(svg) .al-tide-sub {
  font-size: 12.5px;
  font-style: italic;
  fill: var(--brand-primary);
}

.agency-ladder :deep(svg) .al-credit {
  font-size: 11px;
  font-style: italic;
  fill: var(--brand-text);
}

.agency-ladder__caption {
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.8;
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes. */
:global(.slidev-nav-go-backward .al-rung),
:global(.slidev-nav-go-backward .al-arrow-group),
:global(.slidev-nav-go-backward .al-step),
:global(.slidev-nav-go-backward .al-tide) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
