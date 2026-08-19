<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'lg' },
  caption: {
    type: String,
    default: 'Three job titles. One job: turning ambiguity into clarity.',
  },
})

/**
 * Three beats, because the diagram is an argument rather than an illustration:
 * the old sequential model, then the three disciplines converging, then what's
 * left in the middle. Rendering all of it at once gives away the JUDGMENT label
 * before the setup — the room reads the punchline while the speaker is still
 * describing handoffs.
 */
const { $clicks } = useSlideContext()
const converged = computed(() => ($clicks?.value ?? 0) >= 1)
const judged = computed(() => ($clicks?.value ?? 0) >= 2)

const sizeClasses = {
  sm: 'w-full max-w-xl',
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-4 roles-blur', sizeClasses[size] || sizeClasses.lg]">
    <svg
      viewBox="0 0 800 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Before AI: sequential Product, Design, Engineering handoffs. With AI: three overlapping circles meeting at judgment."
    >
      <defs>
        <marker
          id="rb-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-text)" />
        </marker>
        <marker
          id="rb-arrow-dashed"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" style="fill: var(--brand-text)" fill-opacity="0.55" />
        </marker>
      </defs>

      <g class="rb-before" :class="{ 'rb-dim': converged }">
        <text
          class="rb-eyebrow"
          x="170"
          y="34"
          text-anchor="middle"
          letter-spacing="2"
        >
          BEFORE
        </text>
        <text
          class="rb-sub"
          x="170"
          y="56"
          text-anchor="middle"
          opacity="0.65"
        >
          sequential handoffs
        </text>

        <rect
          class="rb-cat-product"
          x="100"
          y="86"
          width="140"
          height="40"
          rx="6"
          fill-opacity="0.14"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="111"
          text-anchor="middle"
        >
          Product
        </text>

        <line
          x1="170"
          y1="130"
          x2="170"
          y2="144"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          marker-end="url(#rb-arrow)"
        />

        <rect
          class="rb-cat-design"
          x="100"
          y="148"
          width="140"
          height="40"
          rx="6"
          fill-opacity="0.14"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="173"
          text-anchor="middle"
        >
          Design
        </text>

        <line
          x1="170"
          y1="192"
          x2="170"
          y2="206"
          style="stroke: var(--brand-text)"
          stroke-width="1.5"
          marker-end="url(#rb-arrow)"
        />

        <rect
          class="rb-cat-engineering"
          x="100"
          y="210"
          width="140"
          height="40"
          rx="6"
          fill-opacity="0.14"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="235"
          text-anchor="middle"
        >
          Engineering
        </text>
      </g>

      <line
        class="rb-stage"
        :class="{ 'is-visible': converged }"
        x1="280"
        y1="168"
        x2="420"
        y2="168"
        style="stroke: var(--brand-text)"
        stroke-width="1.5"
        stroke-dasharray="5 5"
        opacity="0.55"
        marker-end="url(#rb-arrow-dashed)"
      />

      <g class="rb-stage" :class="{ 'is-visible': converged }">
        <text
          class="rb-eyebrow"
          x="590"
          y="34"
          text-anchor="middle"
          letter-spacing="2"
        >
          WITH AI
        </text>
        <text
          class="rb-sub"
          x="590"
          y="56"
          text-anchor="middle"
          opacity="0.65"
        >
          overlapping, blurred boundaries
        </text>

        <!-- Each discipline travels in with its own label, from the direction it
             sits in, so the overlap is something the room watches form rather
             than something that was always there. The offsets are CSS custom
             properties because the circles carry cx/cy, not a transform
             attribute — nothing here for a CSS transform to clobber. -->
        <g class="rb-lobe" style="--dx: 0px; --dy: -42px">
          <circle
            class="rb-cat-product"
            cx="590"
            cy="155"
            r="80"
            fill-opacity="0.20"
            stroke-width="1.5"
          />
          <!-- Labels wear the text token, not the series colour: the palette is
               tuned for marks at >= 3:1, which is short of the 4.5:1 that text
               needs. Each label sits on its own circle, so position carries the
               identity and the fills stay the colour channel. -->
          <text
            class="rb-role"
            x="590"
            y="92"
            text-anchor="middle"
          >
            Product
          </text>
        </g>

        <g class="rb-lobe" style="--dx: -44px; --dy: 30px">
          <circle
            class="rb-cat-design"
            cx="555"
            cy="215"
            r="80"
            fill-opacity="0.20"
            stroke-width="1.5"
          />
          <text
            class="rb-role"
            x="505"
            y="258"
            text-anchor="middle"
          >
            Design
          </text>
        </g>

        <g class="rb-lobe" style="--dx: 44px; --dy: 30px">
          <circle
            class="rb-cat-engineering"
            cx="625"
            cy="215"
            r="80"
            fill-opacity="0.20"
            stroke-width="1.5"
          />
          <text
            class="rb-role"
            x="675"
            y="258"
            text-anchor="middle"
          >
            Engineering
          </text>
        </g>
      </g>

      <!-- Last beat, and deliberately its own: what the convergence leaves in the
           middle is the point of the slide. -->
      <g class="rb-stage rb-judgment-group" :class="{ 'is-visible': judged }">
        <rect
          x="520"
          y="179"
          width="140"
          height="32"
          rx="16"
          style="fill: var(--brand-surface); stroke: var(--brand-primary)"
          stroke-width="1"
        />
        <text
          class="rb-judgment"
          x="590"
          y="201"
          text-anchor="middle"
          letter-spacing="1.5"
        >
          JUDGMENT
        </text>
      </g>
    </svg>

    <!-- Held to the last beat with the JUDGMENT label: the caption names the
         overlap, so showing it on arrival gives away a punchline the diagram
         spends two clicks earning. -->
    <figcaption
      v-if="caption"
      class="roles-blur__caption"
      :class="{ 'is-visible': judged }"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.roles-blur :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
  font-family: inherit;
}

.roles-blur :deep(svg) text {
  font-size: 14px;
}

.roles-blur :deep(svg) .rb-eyebrow {
  font-size: 14px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.roles-blur :deep(svg) .rb-sub {
  font-size: 14px;
  fill: var(--brand-text);
}

.roles-blur :deep(svg) .rb-label {
  font-size: 15px;
  fill: var(--brand-text);
}

/* The three categorical slots, in fixed order: Product, Design, Engineering. */
.roles-blur :deep(svg) .rb-cat-product {
  fill: var(--brand-cat-1);
  stroke: var(--brand-cat-1);
}

.roles-blur :deep(svg) .rb-cat-design {
  fill: var(--brand-cat-2);
  stroke: var(--brand-cat-2);
}

.roles-blur :deep(svg) .rb-cat-engineering {
  fill: var(--brand-cat-3);
  stroke: var(--brand-cat-3);
}

.roles-blur :deep(svg) .rb-role {
  font-size: 16px;
  font-weight: 700;
  fill: var(--brand-text);
  paint-order: stroke fill;
  stroke: var(--brand-surface, #F8F8F8);
  stroke-width: 6px;
  stroke-linejoin: round;
}

/* The diagram's punchline — kept the largest text in the SVG (above the 16px
   role labels) so it can't end up the smallest text on the slide after the
   viewBox scales down. */
.roles-blur :deep(svg) .rb-judgment {
  font-size: 17px;
  font-weight: 700;
  fill: var(--brand-primary);
}

.roles-blur :deep(svg) .rb-before {
  transition: opacity var(--motion-base) var(--motion-ease);
}

/* Not hidden — the comparison is the argument, so the old model stays legible
   while the new one takes the foreground. */
.roles-blur :deep(svg) .rb-dim {
  opacity: 0.4;
}

.roles-blur :deep(svg) .rb-stage {
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

.roles-blur :deep(svg) .rb-stage.is-visible {
  opacity: 1;
}

.roles-blur :deep(svg) .rb-lobe {
  transform: translate(var(--dx), var(--dy));
  transition: transform var(--motion-slow) var(--motion-ease);
}

.roles-blur :deep(svg) .rb-stage.is-visible .rb-lobe {
  transform: none;
}

.roles-blur__caption {
  text-align: center;
  margin-top: 1.25rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
  transition-delay: 120ms;
}

.roles-blur__caption.is-visible {
  opacity: 0.8;
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes. */
:global(.slidev-nav-go-backward .rb-before),
:global(.slidev-nav-go-backward .rb-stage),
:global(.slidev-nav-go-backward .rb-lobe),
:global(.slidev-nav-go-backward .roles-blur__caption) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}
</style>
