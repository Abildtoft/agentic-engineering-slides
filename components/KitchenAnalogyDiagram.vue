<script setup>
const props = defineProps({
  size: { type: String, default: 'lg' },
})

const sizeClasses = {
  md: 'w-full max-w-2xl',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-5xl',
}
</script>

<template>
  <figure :class="['mx-auto mt-2 mb-2 kitchen-analogy', sizeClasses[size] || sizeClasses.lg]">
    <div class="grid grid-cols-3 gap-10">
      <div class="ka-panel" style="--i: 0">
        <div class="ka-badge">
        <svg viewBox="0 0 96 64" role="img" aria-label="Fork, knife and spoon icons">
          <g class="ka-icon">
            <path pathLength="1" d="M14 10 V22 Q14 28 20 28 Q26 28 26 22 V10" />
            <path pathLength="1" d="M20 10 V26" />
            <path pathLength="1" d="M20 28 V54" />
            <path pathLength="1" d="M46 8 C55 16 57 27 47.5 34" />
            <path pathLength="1" d="M46 8 V34 H47.5" />
            <path pathLength="1" d="M46.8 34 V54" />
            <ellipse pathLength="1" cx="78" cy="18" rx="7.5" ry="10" />
            <path pathLength="1" d="M78 28 V54" />
          </g>
        </svg>
        </div>
        <p class="ka-title">APIs are the utensils</p>
        <p class="ka-sub">Specific endpoints that let agents interact with your product</p>
      </div>

      <div class="ka-panel" style="--i: 1">
        <div class="ka-badge">
        <svg viewBox="0 0 96 64" role="img" aria-label="Open recipe book icon">
          <g class="ka-icon">
            <path pathLength="1" d="M48 16 C40 10 26 10 18 14 V46 C26 42 40 42 48 48" />
            <path pathLength="1" d="M48 16 C56 10 70 10 78 14 V46 C70 42 56 42 48 48" />
            <path pathLength="1" d="M48 16 V48" />
            <path pathLength="1" d="M25 22 H40" />
            <path pathLength="1" d="M25 28 H40" />
            <path pathLength="1" d="M25 34 H36" />
            <path pathLength="1" d="M56 22 H71" />
            <path pathLength="1" d="M56 28 H71" />
            <path pathLength="1" d="M56 34 H67" />
          </g>
        </svg>
        </div>
        <p class="ka-title">Skills are the recipes</p>
        <p class="ka-sub">Text files that tell the agent exactly what to do, and how</p>
      </div>

      <div class="ka-panel" style="--i: 2">
        <div class="ka-badge">
        <svg viewBox="0 0 96 64" role="img" aria-label="Stove top icon">
          <g class="ka-icon">
            <rect pathLength="1" x="26" y="8" width="44" height="44" rx="6" />
            <circle pathLength="1" cx="38" cy="20" r="6.5" />
            <circle pathLength="1" cx="58" cy="20" r="6.5" />
            <circle pathLength="1" cx="38" cy="40" r="6.5" />
            <circle pathLength="1" cx="58" cy="40" r="6.5" />
            <path pathLength="1" d="M36 58 H60" />
          </g>
        </svg>
        </div>
        <p class="ka-title">MCP is the kitchen</p>
        <p class="ka-sub">Bundles APIs, auth, and tool definitions into a single server</p>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.ka-panel {
  text-align: center;
  animation: ka-in var(--motion-slow) var(--motion-ease) both;
  animation-delay: calc(var(--i) * 110ms);
}

/* A soft disc behind each icon gives the three concepts equal visual weight —
   the icons themselves have very different footprints. */
.ka-badge {
  width: 6.5rem;
  height: 6.5rem;
  margin: 0 auto 0.9rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--brand-primary) 8%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ka-panel svg {
  height: 3.6rem;
  width: auto;
  display: block;
}

.ka-icon {
  fill: none;
  stroke: var(--brand-primary);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* The icons draw their strokes as the panel lands. Every shape carries
   pathLength="1", so one dash rule draws them all at the same rate. Fully
   drawn is the base state — the draw lives in the keyframe's `from`. */
.ka-icon path,
.ka-icon circle,
.ka-icon rect,
.ka-icon ellipse {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: ka-draw 800ms var(--motion-ease) both;
  animation-delay: calc(var(--i) * 110ms + 150ms);
}

@keyframes ka-draw {
  from {
    stroke-dashoffset: 1;
  }
}

.ka-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-primary);
  margin: 0;
}

.ka-sub {
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--brand-text);
  opacity: 0.7;
  margin: 0.35rem auto 0;
  max-width: 24ch;
}

@keyframes ka-in {
  from {
    opacity: 0;
    transform: translateY(var(--motion-rise));
  }
}
</style>
