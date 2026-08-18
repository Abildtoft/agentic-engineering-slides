<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
  sublabel: { type: String, default: '' },
})

/** Splits "79.8%" into the parts the count-up needs, and returns null for
    anything that isn't a number wearing decoration — a future value like "1 in 3"
    then renders as plain text instead of animating to something wrong. */
const parsed = computed(() => {
  const match = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/.exec(props.value)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return {
    prefix,
    suffix,
    target: Number(digits),
    decimals: (digits.split('.')[1] || '').length,
  }
})

const DURATION = 800
/** Long enough for the slide's crossfade to finish first, so the count reads as
    a deliberate beat rather than part of the transition. */
const DELAY = 160

const isActive = useIsSlideActive()
const { isPrintMode } = useNav()

const shown = ref(null)
let frame = null
let timer = null

const display = computed(() => {
  if (!parsed.value || shown.value === null) return props.value
  const { prefix, suffix, decimals } = parsed.value
  return `${prefix}${shown.value.toFixed(decimals)}${suffix}`
})

function stop() {
  cancelAnimationFrame(frame)
  clearTimeout(timer)
  frame = null
  timer = null
}

function run() {
  stop()
  if (!parsed.value) return
  // A canvas-free animation still can't be trusted in export — the screenshot
  // lands whenever it lands. Same reason ShaderBackground bails here.
  if (isPrintMode.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { target } = parsed.value
  shown.value = 0

  timer = setTimeout(() => {
    // Timed from the first frame rather than from here: a rAF callback carries
    // the timestamp of the frame it belongs to, which can predate this line by a
    // few ms — enough to render one frame of "-0.1%" before the count starts.
    let start = null
    const tick = now => {
      start ??= now
      const t = Math.min((now - start) / DURATION, 1)
      // easeOutCubic: the number arrives fast and settles, which is what makes
      // it feel like a counter rather than a linear scroll.
      shown.value = target * (1 - (1 - t) ** 3)
      if (t < 1) frame = requestAnimationFrame(tick)
      else shown.value = null
    }
    frame = requestAnimationFrame(tick)
  }, DELAY)
}

/** Bound to slide visibility rather than mount: all 57 slides are in the DOM
    from page load, so counting on mount would run — and finish — off-screen. */
watch(
  isActive,
  active => {
    if (active) {
      run()
      return
    }
    stop()
    shown.value = null
  },
  { immediate: true },
)

onBeforeUnmount(stop)
</script>

<template>
  <h1 class="big-number">
    <span class="big-number__label">{{ value }}</span>
    <!-- The sizer holds the final value's width so the centred number doesn't
         drift sideways as digits are added; the live value is taken out of flow
         on top of it. Both are hidden from assistive tech, which reads the
         static value above instead of a per-frame stream of numbers. -->
    <span class="big-number__stack" aria-hidden="true">
      <span class="big-number__sizer">{{ value }}</span>
      <span class="big-number__live">{{ display }}</span>
    </span>
  </h1>
  <h2 class="mt-8 leading-tight max-w-4xl">
    {{ label }}
  </h2>
  <p v-if="sublabel" class="mt-2 opacity-75">{{ sublabel }}</p>
</template>

<style scoped>
.big-number__label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.big-number__stack {
  position: relative;
  display: inline-block;
}

.big-number__sizer {
  visibility: hidden;
}

.big-number__live {
  position: absolute;
  inset: 0;
  /* Fixed-width digits, so the settling number doesn't jitter as 7 becomes 79. */
  font-variant-numeric: tabular-nums;
}
</style>
