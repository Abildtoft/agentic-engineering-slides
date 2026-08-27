<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  label: { type: String, required: true },
})

const isActive = useIsSlideActive()
const { isPrintMode } = useNav()
const el = ref(null)

/** Bound to slide visibility rather than mount: every slide is in the DOM from
    page load, so playing on mount would loop every clip off-screen for the
    whole deck. Print and reduced motion hold the poster frame instead — a
    screenshot lands whenever it lands, same reason BigNumber bails there. */
function sync() {
  const video = el.value
  if (!video) return
  const shouldPlay = isActive.value
    && !isPrintMode.value
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (shouldPlay) {
    video.play().catch(() => {})
  }
  else {
    video.pause()
    video.currentTime = 0
  }
}

onMounted(sync)
watch(isActive, sync)
onBeforeUnmount(() => el.value?.pause())
</script>

<template>
  <figure class="slide-video">
    <video
      ref="el"
      :src="src"
      :poster="poster || undefined"
      :aria-label="label"
      muted
      loop
      playsinline
      preload="auto"
    />
    <figcaption>{{ label }}</figcaption>
  </figure>
</template>

<style scoped>
.slide-video {
  margin: 0;
}

.slide-video video {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.slide-video figcaption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.75;
  text-align: center;
}
</style>
