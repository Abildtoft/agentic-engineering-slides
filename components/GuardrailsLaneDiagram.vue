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

const topChips = [
  { label: 'Linting', x: 250 },
  { label: 'Type checks', x: 400 },
  { label: 'CI gates', x: 560 },
]

const bottomChips = [
  { label: 'Unit tests', x: 250 },
  { label: 'E2E tests', x: 400 },
  { label: 'Human review', x: 560 },
]

const chipWidth = (label) => label.length * 6.6 + 22

// The agent's attempt bounces off both rails before it reaches the pins: the
// rails doing the correcting is the argument.
const path = 'M 152 172 L 310 109 L 480 235 L 646 172'

const pins = [
  { x: 706, y: 172 },
  { x: 734, y: 152 },
  { x: 734, y: 192 },
  { x: 762, y: 132 },
  { x: 762, y: 172 },
  { x: 762, y: 212 },
]
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-4 guardrails-lane', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 880 344"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Top-down bowling lane: the agent's ball bounces off a tests rail and a reviews rail before reaching pins labeled shipped. The guardrails keep every attempt on the lane."
    >
      <g class="gl-frame">
        <rect x="110" y="106" width="560" height="132" class="gl-bed" />
        <rect x="110" y="88" width="560" height="14" rx="7" class="gl-rail" />
        <rect x="110" y="242" width="560" height="14" rx="7" class="gl-rail" />

        <text x="110" y="46" class="gl-eyebrow" letter-spacing="2">TESTS</text>
        <text x="110" y="304" class="gl-eyebrow" letter-spacing="2">REVIEWS</text>

        <g v-for="c in topChips" :key="c.label">
          <rect :x="c.x - chipWidth(c.label) / 2" y="32" :width="chipWidth(c.label)" height="26" rx="13" class="gl-chip" />
          <text :x="c.x" y="49" text-anchor="middle" class="gl-chip-label">{{ c.label }}</text>
        </g>
        <g v-for="c in bottomChips" :key="c.label">
          <rect :x="c.x - chipWidth(c.label) / 2" y="286" :width="chipWidth(c.label)" height="26" rx="13" class="gl-chip" />
          <text :x="c.x" y="303" text-anchor="middle" class="gl-chip-label">{{ c.label }}</text>
        </g>

        <circle cx="134" cy="172" r="13" class="gl-ball" />
        <text x="134" y="211" text-anchor="middle" class="gl-sub">the agent</text>
      </g>

      <path :d="path" pathLength="1" class="gl-path" />
      <!-- Its own polygon, not a marker: a marker sits at the path's end from
           the start, ignoring the dash draw. Arrives when the draw lands. -->
      <g class="gl-path-cap" transform="translate(646, 172) rotate(-21)">
        <polygon points="0,-5 10,0 0,5" class="gl-arrowhead" />
      </g>

      <!-- Contact marks where the rails catch the ball — they fade in as the
           draw reaches each bounce and stay (a mark that vanished again would
           reappear at full strength in print). -->
      <g class="gl-impact gl-impact--first">
        <line x1="303" y1="113" x2="298" y2="121" />
        <line x1="310" y1="115" x2="310" y2="124" />
        <line x1="317" y1="113" x2="322" y2="121" />
      </g>
      <g class="gl-impact gl-impact--second">
        <line x1="473" y1="231" x2="468" y2="223" />
        <line x1="480" y1="229" x2="480" y2="220" />
        <line x1="487" y1="231" x2="492" y2="223" />
      </g>

      <text x="734" y="98" text-anchor="middle" class="gl-eyebrow gl-shipped" letter-spacing="2">SHIPPED</text>
      <g v-for="(p, i) in pins" :key="i" class="gl-pin-g" :style="`--i: ${i}`">
        <circle :cx="p.x" :cy="p.y" r="9" class="gl-pin" />
        <circle :cx="p.x" :cy="p.y" r="3" class="gl-pin-dot" />
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.guardrails-lane svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.gl-bed {
  fill: var(--brand-primary);
  fill-opacity: 0.04;
}

.gl-rail {
  fill: var(--brand-primary);
  fill-opacity: 0.18;
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.gl-chip {
  fill: var(--brand-primary);
  fill-opacity: 0.07;
  stroke: var(--brand-primary);
  stroke-width: 1.25;
}

.gl-chip-label {
  font-size: 12px;
  fill: var(--brand-text);
}

.gl-eyebrow {
  font-size: 13px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.gl-sub {
  font-size: 11px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.6;
}

.gl-ball {
  fill: var(--brand-primary);
}

.gl-pin {
  fill: var(--brand-surface, #f8f8f8);
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.gl-pin-dot {
  fill: var(--brand-primary);
  fill-opacity: 0.35;
}

.gl-impact line {
  stroke: var(--brand-primary);
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0.6;
}

.gl-path {
  fill: none;
  stroke: var(--brand-text);
  stroke-width: 1.5;
  opacity: 0.65;
  /* Fully drawn is the base state — the undrawn state lives in the
     v-click-hidden rule below, so print and reduced motion land complete. */
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset var(--motion-draw) var(--motion-ease) 200ms;
}

.gl-arrowhead {
  fill: var(--brand-text);
  fill-opacity: 0.65;
}

.gl-frame {
  transition: opacity var(--motion-slow) var(--motion-ease);
}

/* The impact marks land as the draw reaches each bounce. The delays are
   literal because they track fractions of the path draw: bounce one sits ~30%
   along the path, bounce two ~68% — 200ms draw delay + that share of
   --motion-draw (1200ms). Recompute if the path or --motion-draw changes. */
.gl-impact--first {
  transition: opacity var(--motion-base) var(--motion-ease) 565ms;
}

.gl-impact--second {
  transition: opacity var(--motion-base) var(--motion-ease) 1020ms;
}

/* Pins arrive one by one as the ball path finishes its draw (200ms draw delay
   + the draw itself). */
.gl-pin-g {
  transition: opacity var(--motion-base) var(--motion-ease)
    calc(200ms + var(--motion-draw) + var(--i) * 50ms);
}

.gl-shipped {
  transition: opacity var(--motion-base) var(--motion-ease)
    calc(200ms + var(--motion-draw));
}

.gl-path-cap {
  transition: opacity var(--motion-base) var(--motion-ease)
    calc(200ms + var(--motion-draw));
}

/* The lane's only call site sits inside a <v-click>, which hides with opacity —
   a slide-entry animation would run and finish behind the invisible wrapper, so
   the click would reveal a lane that had already bowled. The build rides the
   v-click state instead. Hidden holds the
   pre-build state with transitions off (stepping backward is instant, matching
   the deck rule), and losing the class plays the whole ~1.6s build exactly when
   the audience is looking. Export steps click states with transitions killed,
   landing on the finished base state above.

   Whole selector inside :global() — Vue's scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops the rest. */
:global(.slidev-vclick-hidden .gl-frame),
:global(.slidev-vclick-hidden .gl-impact--first),
:global(.slidev-vclick-hidden .gl-impact--second),
:global(.slidev-vclick-hidden .gl-pin-g),
:global(.slidev-vclick-hidden .gl-shipped),
:global(.slidev-vclick-hidden .gl-path-cap) {
  opacity: 0;
  transition: none;
}

:global(.slidev-vclick-hidden .gl-path) {
  stroke-dashoffset: 1;
  transition: none;
}
</style>
