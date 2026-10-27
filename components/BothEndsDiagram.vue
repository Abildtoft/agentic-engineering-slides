<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'lg' },
})

/**
 * Martin Gratzer's own workflow eight months apart, redrawn as two lanes that
 * read left to right. His original stacks each month as a column; a slide is
 * landscape, and narrated mode clamps every figure to 220px tall, so the
 * months became rows. The rows share their end columns on purpose: planning
 * sits above shaping the issue, merging above shaping the system, and the
 * February review above October's risk fork.
 *
 * Two beats after arrival: October's pipeline, then the loop that turns drift
 * into guardrails, because shaping the system is the half of "both ends" the
 * room hasn't seen before.
 */
const { $clicks } = useSlideContext()
const reforged = computed(() => ($clicks?.value ?? 0) >= 1)
const shaped = computed(() => ($clicks?.value ?? 0) >= 2)

// Fill carries the legend: solid where a human spends time, outlined where the
// agent does the work.
const february = [
  { x: 110, w: 140, title: 'Plan the issue', sub: 'with the agent', human: true },
  { x: 274, w: 144, title: 'Implement', sub: 'from the issue' },
  { x: 443, w: 144, title: 'Self-review', sub: 'lint, build, test' },
  { x: 612, w: 144, title: 'Review the PR', sub: 'line comments', human: true },
  { x: 780, w: 140, title: 'Merge', sub: 'the final call', human: true },
]

// Gratzer's own command names, set in the code face like the issue-to-PR
// command on the slide before.
const steps = [
  { x: 274, title: 'ship', sub: 'build + verify' },
  { x: 392, title: 'guard', sub: 'CI + feedback' },
  { x: 510, title: 'land', sub: 'risk verdict' },
]

const outcomes = [
  { y: 122, title: 'Auto-merge', sub: 'low risk' },
  { y: 172, title: 'Review', sub: 'where to look', human: true },
]

const FEB_Y = 12
const OCT_Y = 144
const NODE_H = 46
const STEP_W = 100

const sizeClasses = {
  sm: 'w-full max-w-xl',
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-1 both-ends', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 920 254"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Martin Gratzer's workflow in February and October. February, a human in the middle: he plans the issue with the agent, the agent implements and self-reviews, he reviews the pull request with line comments and makes the final call on the merge, and fixes loop back to implementation. October, a human at both ends: he shapes the issue, then inside the repository's guardrails the agent ships, guards and lands the change with a risk verdict. Low-risk changes merge automatically; the rest come to him with a list of where to look. He shapes the system, turning drift into new guardrails."
    >
      <defs>
        <marker
          id="be-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="be-arrowhead" />
        </marker>
      </defs>

      <!-- February: present on arrival, built left to right on the deck's 90ms
           beat. Each node carries the arrow that leads into it. -->
      <g class="be-enter" style="--i: 0">
        <text class="be-month" x="0" y="31" letter-spacing="1.5">FEBRUARY</text>
        <text class="be-lane-sub" x="0" y="49">a human in</text>
        <text class="be-lane-sub" x="0" y="64">the middle</text>
      </g>

      <g
        v-for="(n, i) in february"
        :key="n.title"
        class="be-enter"
        :style="`--i: ${i + 1}`"
      >
        <line
          v-if="i > 0"
          class="be-flow"
          :x1="february[i - 1].x + february[i - 1].w + 2"
          :y1="FEB_Y + NODE_H / 2"
          :x2="n.x - 3"
          :y2="FEB_Y + NODE_H / 2"
          marker-end="url(#be-arrow)"
        />
        <rect
          :class="n.human ? 'be-human' : 'be-agent'"
          :x="n.x"
          :y="FEB_Y"
          :width="n.w"
          :height="NODE_H"
          rx="9"
        />
        <text :class="['be-title', { 'be-on-human': n.human }]" :x="n.x + n.w / 2" :y="FEB_Y + 20" text-anchor="middle">
          {{ n.title }}
        </text>
        <text :class="['be-sub', { 'be-on-human': n.human }]" :x="n.x + n.w / 2" :y="FEB_Y + 36" text-anchor="middle">
          {{ n.sub }}
        </text>
      </g>

      <g class="be-enter" style="--i: 6">
        <path class="be-loop" d="M 684 58 V 74 H 346 V 62" marker-end="url(#be-arrow)" />
        <text class="be-loop-label" x="515" y="88" text-anchor="middle">fix + update docs</text>
      </g>

      <!-- The legend arrives with February: it is what makes the first lane
           readable, before October gives the fills a second meaning. -->
      <g class="be-enter be-legend" style="--i: 7">
        <rect class="be-human" x="0" y="214" width="12" height="12" rx="3" />
        <text class="be-legend-label" x="19" y="224">human</text>
        <rect class="be-agent" x="0.75" y="236.75" width="10.5" height="10.5" rx="2.5" />
        <text class="be-legend-label" x="19" y="246">agent</text>
      </g>

      <!-- October, click 1: the issue, the pipeline inside the guardrails, and
           the risk fork. Staggered with transition delays so the flow builds in
           reading order on a single click. -->
      <g class="be-stage" :class="{ 'be-stage-visible': reforged }" style="--d: 0ms">
        <text class="be-month" x="0" y="163" letter-spacing="1.5">OCTOBER</text>
        <text class="be-lane-sub" x="0" y="181">a human at</text>
        <text class="be-lane-sub" x="0" y="196">both ends</text>

        <rect class="be-human" x="110" :y="OCT_Y" width="140" :height="NODE_H" rx="9" />
        <text class="be-title be-on-human" x="180" :y="OCT_Y + 20" text-anchor="middle">Shape the issue</text>
        <text class="be-sub be-on-human" x="180" :y="OCT_Y + 36" text-anchor="middle">sparring with the agent</text>
      </g>

      <g class="be-stage" :class="{ 'be-stage-visible': reforged }" style="--d: 90ms">
        <rect class="be-band" x="264" y="114" width="356" height="86" rx="14" />
        <text class="be-band-label" x="276" y="132" letter-spacing="1.5">
          GUARDRAILS<tspan class="be-band-sub" dx="6" letter-spacing="0">repo + harness</tspan>
        </text>
        <line class="be-flow" x1="252" :y1="OCT_Y + NODE_H / 2" x2="271" :y2="OCT_Y + NODE_H / 2" marker-end="url(#be-arrow)" />
      </g>

      <g
        v-for="(s, i) in steps"
        :key="s.title"
        class="be-stage"
        :class="{ 'be-stage-visible': reforged }"
        :style="`--d: ${180 + i * 90}ms`"
      >
        <line
          v-if="i > 0"
          class="be-flow"
          :x1="steps[i - 1].x + STEP_W + 2"
          :y1="OCT_Y + NODE_H / 2"
          :x2="s.x - 3"
          :y2="OCT_Y + NODE_H / 2"
          marker-end="url(#be-arrow)"
        />
        <rect class="be-agent" :x="s.x" :y="OCT_Y" :width="STEP_W" :height="NODE_H" rx="9" />
        <text class="be-title be-command" :x="s.x + STEP_W / 2" :y="OCT_Y + 20" text-anchor="middle">{{ s.title }}</text>
        <text class="be-sub" :x="s.x + STEP_W / 2" :y="OCT_Y + 36" text-anchor="middle">{{ s.sub }}</text>
      </g>

      <g class="be-stage" :class="{ 'be-stage-visible': reforged }" style="--d: 450ms">
        <path
          class="be-flow"
          :d="`M 620 ${OCT_Y + NODE_H / 2} H 630 V ${outcomes[0].y + 20} H 641`"
          marker-end="url(#be-arrow)"
        />
        <path
          class="be-flow"
          :d="`M 630 ${OCT_Y + NODE_H / 2} V ${outcomes[1].y + 20} H 641`"
          marker-end="url(#be-arrow)"
        />
        <g v-for="o in outcomes" :key="o.title">
          <rect :class="o.human ? 'be-human' : 'be-agent'" x="644" :y="o.y" width="116" height="40" rx="9" />
          <text :class="['be-title be-title--small', { 'be-on-human': o.human }]" x="702" :y="o.y + 17" text-anchor="middle">
            {{ o.title }}
          </text>
          <text :class="['be-sub', { 'be-on-human': o.human }]" x="702" :y="o.y + 32" text-anchor="middle">
            {{ o.sub }}
          </text>
        </g>
      </g>

      <!-- October, click 2: the other end. Outside the pipeline on purpose — it
           has no arrow in from the fork, because it runs continuously rather
           than once per change, and its only output is a stronger band. -->
      <g class="be-stage" :class="{ 'be-stage-visible': shaped }" style="--d: 0ms">
        <rect class="be-human" x="780" :y="OCT_Y" width="140" :height="NODE_H" rx="9" />
        <text class="be-title be-on-human" x="850" :y="OCT_Y + 20" text-anchor="middle">Shape the system</text>
        <text class="be-sub be-on-human" x="850" :y="OCT_Y + 36" text-anchor="middle">drift → guardrails</text>
      </g>

      <g class="be-stage" :class="{ 'be-stage-visible': shaped }" style="--d: 120ms">
        <path class="be-loop" d="M 850 190 V 226 H 442 V 204" marker-end="url(#be-arrow)" />
        <text class="be-loop-label" x="646" y="242" text-anchor="middle">spot checks, new guardrails</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.both-ends svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

/* Human time is the solid fill: it is what the eye should be able to count in
   each lane before reading a single label. */
.be-human {
  fill: var(--brand-primary);
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.be-agent {
  fill: var(--brand-bg);
  stroke: var(--brand-primary);
  stroke-opacity: 0.5;
  stroke-width: 1.5;
}

.be-band {
  fill: var(--brand-primary);
  fill-opacity: 0.06;
  stroke: var(--brand-primary);
  stroke-opacity: 0.25;
  stroke-width: 1.25;
}

/* The 920-unit viewBox renders at ~868px on a full-width slide (a 0.94 scale)
   and ~790px under narrated mode's 220px clamp (0.86) — sizes are set for what
   survives the smaller of the two on a projector. */
.be-title {
  font-size: 14px;
  font-weight: 700;
  fill: var(--brand-text);
}

.be-title--small {
  font-size: 13px;
}

.be-command {
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  font-size: 15px;
  fill: var(--brand-primary);
}

.be-sub {
  font-size: 11px;
  fill: var(--brand-text);
  opacity: 0.7;
}

.be-on-human {
  fill: var(--brand-on-accent);
}

.be-sub.be-on-human {
  opacity: 0.85;
}

.be-month {
  font-size: 13px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.be-lane-sub {
  font-size: 12.5px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.75;
}

.be-band-label {
  font-size: 10.5px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.be-band-sub {
  font-weight: 400;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.7;
}

.be-flow {
  fill: none;
  stroke: var(--brand-text);
  stroke-width: 1.5;
  opacity: 0.55;
}

.be-loop {
  fill: none;
  stroke: var(--brand-text);
  stroke-width: 1.25;
  stroke-dasharray: 4 4;
  opacity: 0.55;
}

.be-arrowhead {
  fill: var(--brand-text);
}

.be-loop-label,
.be-legend-label {
  font-size: 11.5px;
  font-style: italic;
  fill: var(--brand-text);
  opacity: 0.7;
}

/* Slide entry: February rises in, label first, then each step in reading
   order. Hidden state lives in the keyframe's `from`, so print and reduced
   motion land complete. */
.be-enter {
  animation: be-in var(--motion-base) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 90ms);
}

@keyframes be-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

/* October is click-driven, so it rides transitions rather than the entry
   animation — reversible, and it never contends with February's entrance for
   the same properties. */
.be-stage {
  opacity: 0;
  transform: translateY(var(--motion-rise));
  transition:
    opacity var(--motion-base) var(--motion-ease) var(--d, 0ms),
    transform var(--motion-base) var(--motion-ease) var(--d, 0ms);
}

.be-stage-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes.
   The delays go too: a staggered build replayed in reverse is the worst case. */
:global(.slidev-nav-go-backward .be-stage) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
