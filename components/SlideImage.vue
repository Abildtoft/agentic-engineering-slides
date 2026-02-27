<script setup>
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  size: { type: String, default: 'md' },
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
    :src="src"
    :alt="alt"
    :class="['mx-auto mt-2 mb-4', sizeClasses[size] || sizeClasses.md]"
  />
</template>
