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

// Reads the slide's click state without consuming clicks: the through-arrow is
// the "holes line up" punchline, so it lands with the slide's second text
// click, which is the line that says it.
const { $clicks } = useSlideContext()
const linedUp = computed(() => ($clicks?.value ?? 0) >= 2)

/* `reach` is when the through-line's tip arrives at this slice, as a fraction
   of the draw's duration. The draw runs on --motion-ease, which decelerates,
   so it is E⁻¹(p) for cubic-bezier(0.22, 0.61, 0.36, 1) at the slice's path
   fraction p = (x − 36) / 774, computed numerically:
     x=168 → p=0.170 → 0.062   x=302 → p=0.344 → 0.129   x=436 → p=0.517 → 0.208
     x=570 → p=0.690 → 0.312   x=704 → p=0.863 → 0.486
   Recompute if a slice moves, the line's span changes, or the ease changes. */
const slices = [
  {
    x: 168, reach: 0.062, label: ['Compare', 'multiple options'],
    holes: [{ dx: 10, y: 132, r: 9 }, { dx: -8, y: 240, r: 7 }],
  },
  {
    x: 302, reach: 0.129, label: ['Deterministic', 'guardrails'],
    holes: [{ dx: -6, y: 118, r: 7 }, { dx: 12, y: 158, r: 6 }, { dx: -4, y: 262, r: 10 }],
  },
  {
    x: 436, reach: 0.208, label: ['Acceptance', 'criteria'],
    holes: [{ dx: 8, y: 128, r: 8 }, { dx: -10, y: 246, r: 8 }],
  },
  {
    x: 570, reach: 0.312, label: ['Permission', 'systems'],
    holes: [{ dx: -8, y: 140, r: 10 }, { dx: 10, y: 254, r: 6 }],
  },
  {
    x: 704, reach: 0.486, label: ['Adversarial', 'verification'],
    holes: [{ dx: 6, y: 122, r: 7 }, { dx: -6, y: 166, r: 6 }, { dx: 8, y: 250, r: 9 }],
  },
]

const SLICE_W = 64
const SLICE_TOP = 96
const SLICE_H = 210
const ALIGNED_Y = 200
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-4 swiss-cheese', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 880 330"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'is-lined-up': linedUp }"
      role="img"
      aria-label="Five safeguard layers drawn as slices with holes: compare multiple options, deterministic guardrails, acceptance criteria, permission systems, adversarial verification. Most attempts are stopped by a layer; one path passes through holes that line up in every slice."
    >
      <text x="24" y="150" class="sc-eyebrow" letter-spacing="2">SPECS +</text>
      <text x="24" y="168" class="sc-eyebrow" letter-spacing="2">AGENTS</text>

      <!-- Attempts stopped by a layer: each draws in and ends flat against a
           terminal bar — the wall it hit — rather than an arrowhead. -->
      <g class="sc-stopped">
        <line x1="36" y1="132" x2="150" y2="132" pathLength="1" class="sc-stopped-line" />
        <line x1="153" y1="124" x2="153" y2="140" class="sc-stopped-bar" />
        <line x1="36" y1="240" x2="283" y2="240" pathLength="1" class="sc-stopped-line" />
        <line x1="286" y1="232" x2="286" y2="248" class="sc-stopped-bar" />
      </g>

      <g
        v-for="(s, i) in slices"
        :key="s.x"
        class="sc-slice"
        :style="`--i: ${i}; --reach: ${s.reach}`"
      >
        <g :transform="`skewX(-6)`" :transform-origin="`${s.x} ${SLICE_TOP + SLICE_H / 2}`">
          <rect
            :x="s.x - SLICE_W / 2"
            :y="SLICE_TOP"
            :width="SLICE_W"
            :height="SLICE_H"
            rx="12"
            class="sc-body"
          />
          <circle
            v-for="(h, j) in s.holes"
            :key="j"
            :cx="s.x + h.dx"
            :cy="h.y"
            :r="h.r"
            class="sc-hole"
          />
          <!-- The aligned hole every slice shares — the one the incident
               threads. Lights up as the through-line reaches it. -->
          <circle :cx="s.x" :cy="ALIGNED_Y" r="9" class="sc-hole sc-hole--aligned" />
        </g>
        <text :x="s.x" :y="58" text-anchor="middle" class="sc-label">{{ s.label[0] }}</text>
        <text :x="s.x" :y="76" text-anchor="middle" class="sc-label">{{ s.label[1] }}</text>
      </g>

      <!-- The punchline path: rides the slide's second click as a transition,
           so it draws when the speaker says "when they line up", reverses on
           step-back, and lands drawn in export. The arrowhead is its own
           polygon rather than a marker — a marker sits at the line's end from
           the start, ignoring the dash draw. -->
      <g class="sc-through" :class="{ 'is-lined-up': linedUp }">
        <line
          x1="36"
          :y1="ALIGNED_Y"
          x2="800"
          :y2="ALIGNED_Y"
          pathLength="1"
          class="sc-through-line"
        />
        <g class="sc-through-cap">
          <polygon
            :points="`800,${ALIGNED_Y - 5} 810,${ALIGNED_Y} 800,${ALIGNED_Y + 5}`"
            class="sc-arrowhead-accent"
          />
          <text x="822" :y="ALIGNED_Y + 5" class="sc-through-label">incident</text>
        </g>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.swiss-cheese svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.sc-body {
  fill: var(--brand-primary);
  fill-opacity: 0.12;
  stroke: var(--brand-primary);
  stroke-width: 1.5;
}

.sc-hole {
  fill: var(--brand-bg, #ffffff);
  stroke: var(--brand-primary);
  stroke-opacity: 0.4;
  stroke-width: 1;
}

.sc-label {
  font-size: 13px;
  fill: var(--brand-text);
}

.sc-eyebrow {
  font-size: 13px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.sc-stopped line {
  stroke: var(--brand-text);
  stroke-width: 1.5;
  opacity: 0.55;
}

.sc-arrowhead-accent {
  fill: var(--brand-primary);
}

/* The stopped attempts draw in once the slices have landed; each terminal bar
   — the wall the attempt hit — appears as its line reaches it. */
.sc-stopped-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: sc-draw 600ms var(--motion-ease) both;
  animation-delay: 500ms;
}

.sc-stopped-bar {
  stroke-width: 2.5;
  stroke-linecap: round;
  animation: sc-in var(--motion-base) var(--motion-ease) both;
  animation-delay: 1050ms;
}

/* Slices stagger in left to right on entry, with the deck's standard rise.
   Hidden state in the keyframe's `from` — print and reduced motion land fully
   drawn. */
.sc-slice {
  animation: sc-in var(--motion-slow) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 90ms);
}

/* The shared holes brighten one by one as the through-line's draw reaches
   them: each slice carries `--reach`, the eased draw's time fraction at its
   path position (the E⁻¹ table above the slices array). State-class driven, so
   export's stepped clicks land on the right frame. */
.sc-hole--aligned {
  transition: stroke-opacity var(--motion-base) var(--motion-ease);
  transition-delay: calc(var(--reach) * var(--motion-draw));
}

svg.is-lined-up .sc-hole--aligned {
  stroke-opacity: 0.95;
}

/* The whole selector sits inside :global(): the scoped compiler keeps only the
   :global() portion of a mixed selector and silently drops what follows it. */
:global(.slidev-nav-go-backward .sc-hole--aligned) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}

@keyframes sc-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}

@keyframes sc-draw {
  from {
    stroke-dashoffset: 1;
  }
}

/* Click-driven, so a transition (reversible), not an animation. */
.sc-through-line {
  stroke: var(--brand-primary);
  stroke-width: 2;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset var(--motion-draw) var(--motion-ease);
}

.sc-through-label {
  font-size: 12px;
  font-style: italic;
  fill: var(--brand-primary);
}

/* Arrowhead and label arrive together, once the line has finished its draw. */
.sc-through-cap {
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

.sc-through.is-lined-up .sc-through-line {
  stroke-dashoffset: 0;
}

.sc-through.is-lined-up .sc-through-cap {
  opacity: 1;
  transition-delay: var(--motion-draw);
}

/* Backward navigation is instant, matching the deck's global reveal rule. */
:global(.slidev-nav-go-backward .sc-through-line) {
  transition-duration: 0ms;
}

:global(.slidev-nav-go-backward .sc-through-cap) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
