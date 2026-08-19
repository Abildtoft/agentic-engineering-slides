<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'md' },
  caption: { type: String, default: '' },
})

const { $clicks } = useSlideContext()
// Stage 1: the agent implements the issue. Stage 2: the quality loop runs its
// gates to convergence. Stage 3: verified output ships as a Pull Request.
const implemented = computed(() => ($clicks?.value ?? 0) >= 1)
const looped = computed(() => ($clicks?.value ?? 0) >= 2)
const shipped = computed(() => ($clicks?.value ?? 0) >= 3)

// Quality-loop ring, reusing the constraint ring's grammar: gates sit ON the
// ring. Two up top, one at the bottom, keeping the y=160 pipeline lane clear.
const QX = 470
const QY = 160
const QR = 70
const gates = [
  { name: 'code review', angle: 150, lx: 391, ly: 129, anchor: 'end' },
  { name: 'conventions', angle: 30, lx: 549, ly: 129, anchor: 'start' },
  { name: 'refactor fit', angle: 270, lx: 470, ly: 254, anchor: 'middle' },
].map((g) => {
  const rad = (g.angle * Math.PI) / 180
  return { ...g, x: Math.round(QX + QR * Math.cos(rad)), y: Math.round(QY - QR * Math.sin(rad)) }
})

const sizeClasses = {
  sm: 'w-full max-w-2xl',
  md: 'w-full max-w-3xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-0 mb-1 issue-to-pr', sizeClasses[size] || sizeClasses.md]">
    <svg
      viewBox="0 82 920 184"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A Linear issue flows through an agent that implements it on the issue branch, then a bounded review loop of code-review, convention, and refactor gates, then a final verification gate, ending in a pull request whose CI is iterated until green."
    >
      <defs>
        <marker
          id="ip-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-text)" fill-opacity="0.55" />
        </marker>
        <marker
          id="ip-arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-primary)" />
        </marker>
        <radialGradient id="ip-arena">
          <stop offset="72%" style="stop-color: var(--brand-primary)" stop-opacity="0" />
          <stop offset="100%" style="stop-color: var(--brand-primary)" stop-opacity="0.05" />
        </radialGradient>
        <filter id="ip-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" style="flood-color: var(--brand-text)" flood-opacity="0.18" />
        </filter>
      </defs>

      <!-- The Linear issue: present on arrival, everything downstream is clicked
           in — so the issue card is the only element that can carry a slide
           entrance without fighting the click-driven stages. -->
      <g class="ip-enter">
      <rect x="10" y="118" width="150" height="84" rx="14" style="fill: var(--brand-bg)" filter="url(#ip-shadow)" />
      <rect
        x="10"
        y="118"
        width="150"
        height="84"
        rx="14"
        style="fill: var(--brand-primary); stroke: var(--brand-primary)"
        fill-opacity="0.07"
        stroke-width="2"
      />
      <text class="ip-card-title" x="85" y="154" text-anchor="middle" letter-spacing="1">ENG-142</text>
      <text class="ip-sub" x="85" y="176" text-anchor="middle" opacity="0.7">Linear issue</text>
      </g>

      <g class="ip-stage" :class="{ 'ip-stage-visible': implemented }">
        <line
          x1="166"
          y1="160"
          x2="200"
          y2="160"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          opacity="0.55"
          marker-end="url(#ip-arrow)"
        />
        <circle cx="258" cy="160" r="52" fill="none" style="stroke: var(--brand-primary)" stroke-opacity="0.3" stroke-width="1.25" />
        <circle
          cx="258"
          cy="160"
          r="46"
          style="fill: var(--brand-primary); stroke: var(--brand-primary)"
          fill-opacity="0.09"
          stroke-width="1.75"
        />
        <text class="ip-agent" x="258" y="161" text-anchor="middle" letter-spacing="2">AGENT</text>
        <path
          d="M 246 176 q 4 -8 8 0 t 8 0 t 8 0"
          fill="none"
          style="stroke: var(--brand-primary)"
          stroke-width="1.75"
          stroke-linecap="round"
          opacity="0.75"
        />
        <text class="ip-sub ip-italic" x="258" y="230" text-anchor="middle" opacity="0.65">
          implements on the issue branch
        </text>
      </g>

      <g class="ip-stage" :class="{ 'ip-stage-visible': looped }">
        <line
          x1="316"
          y1="160"
          x2="390"
          y2="160"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          opacity="0.55"
          marker-end="url(#ip-arrow)"
        />
        <circle :cx="QX" :cy="QY" :r="QR" fill="url(#ip-arena)" />
        <circle
          :cx="QX"
          :cy="QY"
          :r="QR"
          fill="none"
          style="stroke: var(--brand-primary)"
          stroke-width="1.75"
          stroke-dasharray="2 9"
          stroke-linecap="round"
          opacity="0.6"
        />
        <g v-for="g in gates" :key="g.name">
          <circle class="ip-gate-dot" :cx="g.x" :cy="g.y" r="10.5" stroke-opacity="0.35" stroke-width="1.5" />
          <circle class="ip-gate-core" :cx="g.x" :cy="g.y" r="5.5" />
          <text class="ip-name" :x="g.lx" :y="g.ly" :text-anchor="g.anchor">{{ g.name }}</text>
        </g>
        <text class="ip-agent" :x="QX" :y="QY - 4" text-anchor="middle" letter-spacing="2">REVIEW</text>
        <text class="ip-sub" :x="QX" :y="QY + 18" text-anchor="middle" opacity="0.65">fix · re-run · ×N</text>
      </g>

      <g class="ip-stage" :class="{ 'ip-stage-visible': shipped }">
        <line
          x1="546"
          y1="160"
          x2="600"
          y2="160"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          opacity="0.55"
          marker-end="url(#ip-arrow)"
        />
        <rect x="606" y="136" width="36" height="48" rx="10" style="fill: var(--brand-primary)" filter="url(#ip-shadow)" />
        <path
          d="M 615 160 l 7 8 l 14 -17"
          fill="none"
          style="stroke: var(--brand-on-accent)"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <text class="ip-sub" x="624" y="202" text-anchor="middle" opacity="0.7">verify</text>
        <text class="ip-sub" x="624" y="219" text-anchor="middle" opacity="0.7">fresh, full run</text>
        <line
          x1="648"
          y1="160"
          x2="682"
          y2="160"
          style="stroke: var(--brand-primary)"
          stroke-width="2"
          marker-end="url(#ip-arrow-accent)"
        />
        <rect x="688" y="118" width="222" height="84" rx="14" style="fill: var(--brand-bg)" filter="url(#ip-shadow)" />
        <rect
          x="688"
          y="118"
          width="222"
          height="84"
          rx="14"
          style="fill: var(--brand-primary); stroke: var(--brand-primary)"
          fill-opacity="0.07"
          stroke-width="2"
        />
        <text class="ip-ship" x="799" y="156" text-anchor="middle" letter-spacing="2">PULL REQUEST</text>
        <text class="ip-sub" x="799" y="178" text-anchor="middle" opacity="0.7">CI iterated until green</text>
      </g>
    </svg>

    <figcaption v-if="caption" class="issue-to-pr__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.issue-to-pr :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.issue-to-pr :deep(svg) .ip-stage {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--motion-base) var(--motion-ease),
    transform var(--motion-base) var(--motion-ease);
}

/* Slide entry: the issue card rises in, so the pipeline's starting point
   arrives on the deck's curve; the downstream stages are click-gated above.
   Hidden state lives in the keyframe's `from` — print and reduced motion land
   complete. */
.issue-to-pr :deep(svg) .ip-enter {
  animation: ip-in var(--motion-slow) var(--motion-ease) both;
}

@keyframes ip-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

.issue-to-pr :deep(svg) .ip-stage-visible {
  opacity: 1;
  transform: translateY(0);
}

.issue-to-pr :deep(svg) .ip-gate-dot {
  fill: var(--brand-bg);
  stroke: var(--brand-primary);
}

.issue-to-pr :deep(svg) .ip-gate-core {
  fill: var(--brand-primary);
}

/* The 920-unit viewBox renders at 896px (`lg`), near 1:1 — sizes match the
   constraint ring's, which were set for what survives projection. */
.issue-to-pr :deep(svg) .ip-name {
  font-size: 14px;
  font-weight: 700;
  fill: var(--brand-text);
}

.issue-to-pr :deep(svg) .ip-sub {
  font-size: 13px;
  fill: var(--brand-text);
}

.issue-to-pr :deep(svg) .ip-italic {
  font-style: italic;
}

.issue-to-pr :deep(svg) .ip-agent {
  font-size: 15px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.issue-to-pr :deep(svg) .ip-card-title {
  font-size: 16px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.issue-to-pr :deep(svg) .ip-ship {
  font-size: 16px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.issue-to-pr__caption {
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.8;
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes. */
:global(.slidev-nav-go-backward .ip-stage) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
