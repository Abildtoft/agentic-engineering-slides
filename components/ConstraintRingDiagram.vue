<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'md' },
  caption: { type: String, default: '' },
})

const { $clicks } = useSlideContext()
// Stage 1: a rejected attempt bounces off a gate. Stage 2: cleared output ships.
const bounced = computed(() => ($clicks?.value ?? 0) >= 1)
const shipped = computed(() => ($clicks?.value ?? 0) >= 2)

const CX = 320
const CY = 232
const R = 150

const LABELS = {
  top: g => ({ lx: g.x, anchor: 'middle', nameY: g.y - 34, subY: g.y - 17 }),
  bottom: g => ({ lx: g.x, anchor: 'middle', nameY: g.y + 28, subY: g.y + 45 }),
  right: g => ({ lx: g.x + 18, anchor: 'start', nameY: g.y - 4, subY: g.y + 13 }),
  left: g => ({ lx: g.x - 18, anchor: 'end', nameY: g.y - 4, subY: g.y + 13 }),
}

const gates = [
  { name: 'Correctness', sub: 'unit, property, mutation', angle: 90, side: 'top' },
  { name: 'Security', sub: 'SAST, deps, secrets', angle: 45, side: 'right' },
  { name: 'Performance', sub: 'perf budget, load', angle: -45, side: 'right' },
  { name: 'Accessibility', sub: 'axe, contrast, keyboard', angle: 270, side: 'bottom' },
  { name: 'Maintainability', sub: 'coverage, complexity', angle: 225, side: 'left' },
  { name: 'Cost efficiency', sub: 'token / compute budget', angle: 180, side: 'left' },
  { name: 'Back-pressure', sub: 'throttle inflow, cap WIP', angle: 157.5, side: 'left' },
  { name: 'Comprehensibility', sub: 'review, answerability', angle: 135, side: 'left' },
].map((g) => {
  const rad = (g.angle * Math.PI) / 180
  const x = Math.round(CX + R * Math.cos(rad))
  const y = Math.round(CY - R * Math.sin(rad))
  return { ...g, x, y, ...LABELS[g.side]({ x, y }) }
})

const sizeClasses = {
  sm: 'w-full max-w-2xl',
  md: 'w-full max-w-3xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-0 mb-1 constraint-ring', sizeClasses[size] || sizeClasses.md]">
    <svg
      viewBox="0 30 920 402"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="An agent inside a ring of eight constraints: correctness, security, performance, accessibility, maintainability, cost efficiency, back-pressure, and comprehensibility. A rejected attempt bounces back into the loop; only output that clears every quality gate passes the exit gate and ships."
    >
      <defs>
        <marker
          id="cr-arrow"
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
          id="cr-arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-primary)" />
        </marker>
        <radialGradient id="cr-arena">
          <stop offset="72%" style="stop-color: var(--brand-primary)" stop-opacity="0" />
          <stop offset="100%" style="stop-color: var(--brand-primary)" stop-opacity="0.05" />
        </radialGradient>
        <filter id="cr-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" style="flood-color: var(--brand-text)" flood-opacity="0.18" />
        </filter>
      </defs>

      <g class="cr-slide" :class="{ 'cr-slide-left': shipped }">
      <circle :cx="CX" :cy="CY" :r="R" fill="url(#cr-arena)" />
      <circle
        :cx="CX"
        :cy="CY"
        :r="R"
        fill="none"
        style="stroke: var(--brand-primary)"
        stroke-width="1.75"
        stroke-dasharray="2 9"
        stroke-linecap="round"
        opacity="0.6"
      />

      <g v-for="g in gates" :key="g.name">
        <circle class="cr-gate-dot" :cx="g.x" :cy="g.y" r="10.5" stroke-opacity="0.35" stroke-width="1.5" />
        <circle class="cr-gate-core" :cx="g.x" :cy="g.y" r="5.5" />
        <text class="cr-name" :x="g.lx" :y="g.nameY" :text-anchor="g.anchor">
          {{ g.name }}
        </text>
        <text class="cr-sub" :x="g.lx" :y="g.subY" :text-anchor="g.anchor" opacity="0.65">
          {{ g.sub }}
        </text>
      </g>

      <circle
        :cx="CX"
        :cy="CY"
        r="52"
        fill="none"
        style="stroke: var(--brand-primary)"
        stroke-opacity="0.3"
        stroke-width="1.25"
      />
      <circle
        :cx="CX"
        :cy="CY"
        r="46"
        style="fill: var(--brand-primary); stroke: var(--brand-primary)"
        fill-opacity="0.09"
        stroke-width="1.75"
      />
      <text class="cr-agent" :x="CX" :y="CY + 1" text-anchor="middle" letter-spacing="2">
        AGENT
      </text>
      <path
        :d="`M ${CX - 12} ${CY + 16} q 4 -8 8 0 t 8 0 t 8 0`"
        fill="none"
        style="stroke: var(--brand-primary)"
        stroke-width="1.75"
        stroke-linecap="round"
        opacity="0.75"
      />
      <text class="cr-sub cr-italic" :x="CX" :y="CY + 68" text-anchor="middle" opacity="0.65">
        more code than you can read
      </text>

      <g class="cr-stage" :class="{ 'cr-stage-visible': bounced, 'cr-dim': shipped }">
        <path
          d="M 300 192 C 258 152 208 156 202 194 C 197 224 236 238 272 228"
          fill="none"
          style="stroke: var(--brand-text)"
          stroke-width="2.25"
          stroke-dasharray="7 5"
          opacity="0.7"
          marker-end="url(#cr-arrow)"
        />
        <g style="stroke: var(--brand-primary)" stroke-width="3" stroke-linecap="round">
          <line x1="219" y1="154" x2="237" y2="172" />
          <line x1="237" y1="154" x2="219" y2="172" />
        </g>
      </g>
      </g>

      <g class="cr-stage" :class="{ 'cr-stage-visible': shipped }">
        <line
          x1="378"
          y1="232"
          x2="548"
          y2="232"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          opacity="0.55"
          marker-end="url(#cr-arrow)"
        />
        <text class="cr-sub cr-italic" x="460" y="204" text-anchor="middle" opacity="0.7">
          only output that clears every gate
        </text>
        <rect x="552" y="208" width="36" height="48" rx="10" style="fill: var(--brand-primary)" filter="url(#cr-shadow)" />
        <path
          d="M 561 232 l 7 8 l 14 -17"
          fill="none"
          style="stroke: var(--brand-on-accent)"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <text class="cr-sub" x="570" y="274" text-anchor="middle" opacity="0.7">
          exit gate
        </text>
        <line
          x1="592"
          y1="232"
          x2="640"
          y2="232"
          style="stroke: var(--brand-primary)"
          stroke-width="2"
          marker-end="url(#cr-arrow-accent)"
        />
        <rect x="640" y="196" width="262" height="72" rx="14" style="fill: var(--brand-bg)" filter="url(#cr-shadow)" />
        <rect
          x="640"
          y="196"
          width="262"
          height="72"
          rx="14"
          style="fill: var(--brand-primary); stroke: var(--brand-primary)"
          fill-opacity="0.07"
          stroke-width="2"
        />
        <text class="cr-ship" x="771" y="228" text-anchor="middle" letter-spacing="2">
          SHIP
        </text>
        <text class="cr-sub" x="771" y="250" text-anchor="middle" opacity="0.7">
          production software, good enough to ship
        </text>
      </g>
    </svg>

    <figcaption v-if="caption" class="constraint-ring__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.constraint-ring :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.constraint-ring :deep(svg) .cr-slide {
  transform: translateX(140px);
  transition: transform 0.6s var(--motion-ease);
}

.constraint-ring :deep(svg) .cr-slide-left {
  transform: translateX(0);
}

.constraint-ring :deep(svg) .cr-stage {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s var(--motion-ease), transform 0.5s var(--motion-ease);
}

.constraint-ring :deep(svg) .cr-stage-visible {
  opacity: 1;
  transform: translateY(0);
}

.constraint-ring :deep(svg) .cr-stage-visible.cr-dim {
  opacity: 0.3;
}

.constraint-ring :deep(svg) .cr-gate-dot {
  fill: var(--brand-bg);
  stroke: var(--brand-primary);
}

.constraint-ring :deep(svg) .cr-gate-core {
  fill: var(--brand-primary);
}

/* The 920-unit viewBox renders at 768px (`md`), a 0.83 scale — sizes are set
   for what survives that scale on a projector. */
.constraint-ring :deep(svg) .cr-name {
  font-size: 14px;
  font-weight: 700;
  fill: var(--brand-text);
}

.constraint-ring :deep(svg) .cr-sub {
  font-size: 13px;
  fill: var(--brand-text);
}

.constraint-ring :deep(svg) .cr-italic {
  font-style: italic;
}

.constraint-ring :deep(svg) .cr-agent {
  font-size: 15px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.constraint-ring :deep(svg) .cr-ship {
  font-size: 21px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.constraint-ring__caption {
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.8;
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes. */
:global(.slidev-nav-go-backward .cr-slide),
:global(.slidev-nav-go-backward .cr-stage) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
