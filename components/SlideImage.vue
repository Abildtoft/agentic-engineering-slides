<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  size: { type: String, default: 'md' },
})

const theme = ref('melatech')

onMounted(() => {
  theme.value = document.documentElement.dataset.theme || 'melatech'
})

const resolvedSrc = computed(() => {
  if (theme.value === 'melatech') return props.src
  return `/${theme.value}${props.src}`
})

const sizeClasses = {
  xs: 'h-40 w-auto',
  sm: 'h-52 w-auto',
  md: 'w-full max-w-lg',
  lg: 'w-full max-w-4xl',
  xl: 'w-full max-w-6xl',
}
</script>

<template>
  <img
    :src="resolvedSrc"
    :alt="alt"
    :class="['mx-auto mt-2 mb-4 slide-image', sizeClasses[size] || sizeClasses.md]"
  />
</template>

<style scoped>
/* Scale from just under 1 rather than a rise: most of these sit directly under a
   heading with the caption right beneath, so vertical travel would push against
   both. Runs on slide entry — see the Motion section in styles/index.css. The one
   image nested in a <v-click> animates on its click instead, from the global
   reveal transition, and this entrance plays harmlessly behind it. */
.slide-image {
  animation: image-in 420ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
}

@keyframes image-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
}
</style>
