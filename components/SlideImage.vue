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
    :class="['mx-auto mt-2 mb-4', sizeClasses[size] || sizeClasses.md]"
  />
</template>
