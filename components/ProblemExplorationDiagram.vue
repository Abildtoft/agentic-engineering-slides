<script setup>
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

    <g v-for="panel in panels" :key="panel.key" :transform="`translate(${panel.x} 0)`">
      <text class="diagram-title" :x="panelWidth / 2" y="30" text-anchor="middle">
        {{ panel.title }}
      </text>
      <rect class="diagram-frame" x="0" y="52" :width="panelWidth" :height="panelHeight" rx="8" />

      <g :transform="`translate(0 52)`">
        <g v-if="panel.key === 'ai'">
          <path class="diagram-edge diagram-edge-strong" :d="aiSpiralPath" />
          <circle
            v-for="([cx, cy], index) in aiNodes"
            :key="index"
            class="diagram-node diagram-node-ai"
            :cx="cx"
            :cy="cy"
            r="2.1"
          />
        </g>

        <g v-if="panel.key === 'humans'">
          <circle
            v-for="([cx, cy], index) in humanFrontier"
            :key="index"
            class="diagram-node diagram-node-human"
            :cx="cx"
            :cy="cy"
            r="4.1"
          />
        </g>

        <g v-if="panel.key === 'hybrid'">
          <g v-for="([cx, cy], pointIndex) in hybridFrontier" :key="pointIndex">
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
  font-weight: 650;
}

.diagram-caption {
  fill: var(--brand-text);
  font-size: 15px;
  font-weight: 560;
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
</style>
