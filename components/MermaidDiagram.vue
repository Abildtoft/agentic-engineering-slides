<script setup>
import { computed } from 'vue'
import { renderMermaidSVG } from 'beautiful-mermaid'

const props = defineProps({
  code: { type: String, required: true },
  size: { type: String, default: 'md' },
  bg: { type: String, default: '#11402E' },
  fg: { type: String, default: '#F8F8F8' },
})

const svg = computed(() => {
  try {
    return renderMermaidSVG(props.code.trim(), {
      bg: props.bg,
      fg: props.fg,
    })
  } catch (e) {
    console.error('MermaidDiagram render error:', e)
    return `<pre style="color:red">${e.message}</pre>`
  }
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
  <div
    :class="['mx-auto mt-2 mb-4 mermaid-diagram', sizeClasses[size] || sizeClasses.md]"
    v-html="svg"
  />
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
