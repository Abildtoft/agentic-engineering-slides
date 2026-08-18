<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const panelWidth = 280
const panelHeight = 210

const panels = [
  {
    key: 'ai',
    x: 20,
    title: 'LLMs',
    caption: 'Dense local search',
  },
  {
    key: 'humans',
    x: 340,
    title: 'Humans',
    caption: 'Sparse outward discovery',
  },
  {
    key: 'hybrid',
    x: 660,
    title: 'Humans + AI',
    caption: 'More frontier explored',
  },
]

/** One panel per click, so the slide argues in the order it reads: this is what
    the machine does, this is what we do, this is the two together. The first
    panel is present on arrival — index 0 is visible at click 0 — because landing
    on an empty comparison reads as a broken slide, not as anticipation. */
const { $clicks } = useSlideContext()
const clicks = computed(() => $clicks?.value ?? 0)

const humanFrontier = [
  [22, 28],
  [72, 58],
  [124, 32],
  [182, 50],
  [238, 34],
  [44, 98],
  [101, 112],
  [158, 86],
  [214, 114],
  [258, 92],
  [32, 166],
  [86, 150],
  [141, 176],
  [197, 156],
  [250, 174],
]

const hybridFrontier = [
  [32, 34],
  [96, 54],
  [154, 36],
  [224, 52],
  [58, 102],
  [132, 94],
  [202, 112],
  [252, 92],
  [42, 168],
  [112, 152],
  [172, 174],
  [236, 158],
]

const satellites = [
  [0, -10],
  [7, -7],
  [10, 0],
  [7, 7],
  [0, 10],
  [-7, 7],
  [-10, 0],
  [-7, -7],
  [0, -4],
  [4, 0],
  [0, 4],
  [-4, 0],
]

const aiNodes = Array.from({ length: 86 }, (_, index) => {
  const angle = index * 0.62
  const radius = 6 + index * 0.34
  return [
    panelWidth / 2 + Math.cos(angle) * radius,
    panelHeight / 2 + Math.sin(angle) * radius,
  ]
})

const aiSpiralPath = aiNodes
  .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  .join(' ')
</script>

<template>
  <svg
    class="problem-exploration"
    viewBox="0 0 960 340"
    role="img"
    aria-labelledby="problem-exploration-title problem-exploration-desc"
  >
    <title id="problem-exploration-title">Problem exploration with humans and AI</title>
    <desc id="problem-exploration-desc">
      Three panels compare LLMs, humans, and humans plus AI. LLMs show dense local search,
      humans show sparse outward discovery, and humans plus AI show sparse frontier points
      with local AI exploration around each point.
    </desc>

    <!-- The outer group owns position, the inner one owns the reveal: a CSS
         transform on an element overrides its transform attribute, so animating
         the positioned group would collapse all three panels onto each other. -->
    <g v-for="(panel, panelIndex) in panels" :key="panel.key" :transform="`translate(${panel.x} 0)`">
      <g class="diagram-panel" :class="{ 'is-visible': panelIndex <= clicks }">
        <text class="diagram-title" :x="panelWidth / 2" y="30" text-anchor="middle">
          {{ panel.title }}
        </text>
        <rect class="diagram-frame" x="0" y="52" :width="panelWidth" :height="panelHeight" rx="8" />

        <g :transform="`translate(0 52)`">
          <g v-if="panel.key === 'ai'">
            <!-- pathLength normalises the spiral to 1 unit so the draw doesn't
                 need its measured length. -->
            <path
              class="diagram-edge diagram-edge-strong diagram-spiral"
              :d="aiSpiralPath"
              path-length="1"
            />
            <circle
              v-for="([cx, cy], index) in aiNodes"
              :key="index"
              class="diagram-node diagram-node-ai diagram-trail"
              :style="{ '--i': index }"
              :cx="cx"
              :cy="cy"
              r="2.1"
            />
          </g>

          <g v-if="panel.key === 'humans'">
            <circle
              v-for="([cx, cy], index) in humanFrontier"
              :key="index"
              class="diagram-node diagram-node-human diagram-stagger"
              :style="{ '--i': index }"
              :cx="cx"
              :cy="cy"
              r="4.1"
            />
          </g>

          <g v-if="panel.key === 'hybrid'">
            <g
              v-for="([cx, cy], pointIndex) in hybridFrontier"
              :key="pointIndex"
              class="diagram-stagger"
              :style="{ '--i': pointIndex }"
            >
              <line
                v-for="([dx, dy], satelliteIndex) in satellites.slice(0, 8)"
                :key="satelliteIndex"
                class="diagram-edge"
                :x1="cx"
                :y1="cy"
                :x2="cx + dx"
                :y2="cy + dy"
              />
              <circle class="diagram-node diagram-node-human" :cx="cx" :cy="cy" r="3.5" />
              <circle
                v-for="([dx, dy], satelliteIndex) in satellites"
                :key="satelliteIndex"
                class="diagram-node diagram-node-ai"
                :cx="cx + dx"
                :cy="cy + dy"
                r="1.55"
              />
            </g>
          </g>
        </g>

        <text class="diagram-caption" :x="panelWidth / 2" y="296" text-anchor="middle">
          {{ panel.caption }}
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.problem-exploration {
  display: block;
  inline-size: min(100%, 970px);
  block-size: auto;
  margin: 1.2rem auto 0;
}

.diagram-title {
  fill: var(--brand-text);
  font-size: 23px;
  font-weight: 600;
}

.diagram-caption {
  fill: var(--brand-text);
  font-size: 15px;
  font-weight: 500;
  opacity: 0.72;
}

.diagram-frame {
  fill: var(--brand-surface);
  stroke: var(--brand-text);
  stroke-width: 2.4;
  opacity: 0.96;
}

.diagram-node {
  vector-effect: non-scaling-stroke;
}

/* Deliberately primary/text rather than the --brand-cat-* slots: in the hybrid
   panel both series co-occupy each cluster, so radius (3.5 vs 1.55) carries the
   distinction and colour only reinforces it — the cat palette's hue separation
   isn't needed, and primary/text survives greyscale by luminance. */
.diagram-node-ai {
  fill: var(--brand-primary);
}

.diagram-node-human {
  fill: var(--brand-text);
}

.diagram-edge {
  stroke: var(--brand-primary);
  stroke-width: 0.9;
  stroke-linecap: round;
  opacity: 0.28;
  vector-effect: non-scaling-stroke;
}

.diagram-edge-strong {
  fill: none;
  stroke-width: 1.2;
  opacity: 0.34;
}

/* Click-driven, so it reverses cleanly when the speaker steps back. The first
   panel is already `is-visible` on arrival, which means no transition runs for
   it — it's simply there. */
.diagram-panel {
  opacity: 0;
  transition: opacity 380ms var(--motion-ease);
}

.diagram-panel.is-visible {
  opacity: 1;
}

/* Inside a revealed panel the marks cascade instead of arriving as a block: the
   frontier points read as being found one at a time, which is the claim the
   panel is making. Delay is per-index and short — twelve points land in ~200ms
   after the panel itself. */
.diagram-stagger {
  opacity: 0;
  transition: opacity 260ms var(--motion-ease);
}

.diagram-panel.is-visible .diagram-stagger {
  opacity: 1;
  transition-delay: calc(180ms + var(--i, 0) * 16ms);
}

/* Backward navigation is instant, matching the deck's global reveal rule — the
   global rule only covers .slidev-vclick-target, not $clicks-driven classes. */
:global(.slidev-nav-go-backward .diagram-panel),
:global(.slidev-nav-go-backward .diagram-stagger) {
  transition-duration: 0ms;
  transition-delay: 0ms;
}

/* The LLM panel is present on arrival, so its flourish runs on slide entry and
   uses `animation` — see the Motion section in styles/index.css for why the two
   mechanisms split that way. The dots trail the drawing line: 86 nodes at 14ms
   apart finishes within a few frames of the spiral itself. */
.diagram-spiral {
  animation: spiral-draw var(--motion-draw) ease both;
}

@keyframes spiral-draw {
  from {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }
  to {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
  }
}

.diagram-trail {
  animation: trail-in 200ms ease both;
  animation-delay: calc(var(--i, 0) * 14ms);
}

@keyframes trail-in {
  from { opacity: 0; }
}
</style>
