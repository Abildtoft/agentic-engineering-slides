<script setup>
import { computed, onMounted, ref } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  size: { type: String, default: 'lg' },
  caption: {
    type: String,
    default: 'Three job titles. One job: turning ambiguity into clarity.',
  },
})

const accent = ref('#186346')
const text = ref('#282625')
const surface = ref('#F8F8F8')
/** The three categorical slots, in fixed order: Product, Design, Engineering. */
const productColor = ref('#C77A2B')
const designColor = ref('#2F6FB5')
const engineeringColor = ref('#1E7A55')

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)
  const read = (name, fallback) => styles.getPropertyValue(name).trim() || fallback

  accent.value = read('--brand-primary', accent.value)
  text.value = read('--brand-text', text.value)
  surface.value = read('--brand-surface', surface.value)
  productColor.value = read('--brand-cat-1', productColor.value)
  designColor.value = read('--brand-cat-2', designColor.value)
  engineeringColor.value = read('--brand-cat-3', engineeringColor.value)
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
          <path d="M 0 0 L 10 5 L 0 10 z" :fill="text" />
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
          <path d="M 0 0 L 10 5 L 0 10 z" :fill="text" fill-opacity="0.55" />
        </marker>
      </defs>

      <g class="rb-before" :class="{ 'rb-dim': converged }">
        <text
          class="rb-eyebrow"
          x="170"
          y="34"
          text-anchor="middle"
          :fill="accent"
          letter-spacing="2"
        >
          BEFORE
        </text>
        <text
          class="rb-sub"
          x="170"
          y="56"
          text-anchor="middle"
          :fill="text"
          opacity="0.65"
        >
          sequential handoffs
        </text>

        <rect
          x="100"
          y="86"
          width="140"
          height="40"
          rx="6"
          :fill="productColor"
          fill-opacity="0.14"
          :stroke="productColor"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="111"
          text-anchor="middle"
          :fill="text"
        >
          Product
        </text>

        <line
          x1="170"
          y1="130"
          x2="170"
          y2="144"
          :stroke="text"
          stroke-width="1.5"
          marker-end="url(#rb-arrow)"
        />

        <rect
          x="100"
          y="148"
          width="140"
          height="40"
          rx="6"
          :fill="designColor"
          fill-opacity="0.14"
          :stroke="designColor"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="173"
          text-anchor="middle"
          :fill="text"
        >
          Design
        </text>

        <line
          x1="170"
          y1="192"
          x2="170"
          y2="206"
          :stroke="text"
          stroke-width="1.5"
          marker-end="url(#rb-arrow)"
        />

        <rect
          x="100"
          y="210"
          width="140"
          height="40"
          rx="6"
          :fill="engineeringColor"
          fill-opacity="0.14"
          :stroke="engineeringColor"
          stroke-width="1.5"
        />
        <text
          class="rb-label"
          x="170"
          y="235"
          text-anchor="middle"
          :fill="text"
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
        :stroke="text"
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
          :fill="accent"
          letter-spacing="2"
        >
          WITH AI
        </text>
        <text
          class="rb-sub"
          x="590"
          y="56"
          text-anchor="middle"
          :fill="text"
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
            cx="590"
            cy="155"
            r="80"
            :fill="productColor"
            fill-opacity="0.20"
            :stroke="productColor"
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
            :fill="text"
          >
            Product
          </text>
        </g>

        <g class="rb-lobe" style="--dx: -44px; --dy: 30px">
          <circle
            cx="555"
            cy="215"
            r="80"
            :fill="designColor"
            fill-opacity="0.20"
            :stroke="designColor"
            stroke-width="1.5"
          />
          <text
            class="rb-role"
            x="505"
            y="258"
            text-anchor="middle"
            :fill="text"
          >
            Design
          </text>
        </g>

        <g class="rb-lobe" style="--dx: 44px; --dy: 30px">
          <circle
            cx="625"
            cy="215"
            r="80"
            :fill="engineeringColor"
            fill-opacity="0.20"
            :stroke="engineeringColor"
            stroke-width="1.5"
          />
          <text
            class="rb-role"
            x="675"
            y="258"
            text-anchor="middle"
            :fill="text"
          >
            Engineering
          </text>
        </g>
      </g>

      <!-- Last beat, and deliberately its own: what the convergence leaves in the
           middle is the point of the slide. -->
      <g class="rb-stage rb-judgment-group" :class="{ 'is-visible': judged }">
        <rect
          x="542"
          y="181"
          width="96"
          height="28"
          rx="14"
          :fill="surface"
          :stroke="accent"
          stroke-width="1"
        />
        <text
          class="rb-judgment"
          x="590"
          y="200"
          text-anchor="middle"
          :fill="accent"
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
}

.roles-blur :deep(svg) .rb-sub {
  font-size: 13px;
}

.roles-blur :deep(svg) .rb-label {
  font-size: 14px;
}

.roles-blur :deep(svg) .rb-role {
  font-size: 15px;
  font-weight: 700;
  paint-order: stroke fill;
  stroke: var(--brand-surface, #F8F8F8);
  stroke-width: 6px;
  stroke-linejoin: round;
}

.roles-blur :deep(svg) .rb-judgment {
  font-size: 11px;
  font-weight: 700;
}

.roles-blur :deep(svg) .rb-before {
  transition: opacity 400ms ease;
}

/* Not hidden — the comparison is the argument, so the old model stays legible
   while the new one takes the foreground. */
.roles-blur :deep(svg) .rb-dim {
  opacity: 0.4;
}

.roles-blur :deep(svg) .rb-stage {
  opacity: 0;
  transition: opacity 400ms ease;
}

.roles-blur :deep(svg) .rb-stage.is-visible {
  opacity: 1;
}

.roles-blur :deep(svg) .rb-lobe {
  transform: translate(var(--dx), var(--dy));
  transition: transform 620ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.roles-blur :deep(svg) .rb-stage.is-visible .rb-lobe {
  transform: none;
}

/* Held back until the circles have almost finished travelling, so the label lands
   in a middle that already exists rather than appearing to create it. */
.roles-blur :deep(svg) .rb-judgment-group.is-visible {
  transition-delay: 120ms;
}

.roles-blur__caption {
  text-align: center;
  margin-top: 1.25rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0;
  transition: opacity 400ms ease;
  transition-delay: 120ms;
}

.roles-blur__caption.is-visible {
  opacity: 0.8;
}
</style>
