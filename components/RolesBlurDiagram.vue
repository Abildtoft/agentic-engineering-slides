<script setup>
import { onMounted, ref } from 'vue'

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

      <g>
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

      <g>
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

        <circle
          cx="590"
          cy="155"
          r="80"
          :fill="productColor"
          fill-opacity="0.20"
          :stroke="productColor"
          stroke-width="1.5"
        />
        <circle
          cx="555"
          cy="215"
          r="80"
          :fill="designColor"
          fill-opacity="0.20"
          :stroke="designColor"
          stroke-width="1.5"
        />
        <circle
          cx="625"
          cy="215"
          r="80"
          :fill="engineeringColor"
          fill-opacity="0.20"
          :stroke="engineeringColor"
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
        <text
          class="rb-role"
          x="505"
          y="258"
          text-anchor="middle"
          :fill="text"
        >
          Design
        </text>
        <text
          class="rb-role"
          x="675"
          y="258"
          text-anchor="middle"
          :fill="text"
        >
          Engineering
        </text>

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

    <figcaption v-if="caption" class="roles-blur__caption">
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

.roles-blur__caption {
  text-align: center;
  margin-top: 1.25rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--brand-text);
  opacity: 0.8;
}
</style>
