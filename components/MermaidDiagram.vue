<script setup>
import { computed, onMounted, ref } from 'vue'
import { renderMermaidSVG } from 'beautiful-mermaid'

const props = defineProps({
  code: { type: String, required: true },
  size: { type: String, default: 'md' },
  bg: { type: String, default: null },
  fg: { type: String, default: null },
})

const resolvedBg = ref(props.bg)
const resolvedFg = ref(props.fg)

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)
  if (!props.bg) {
    resolvedBg.value = styles.getPropertyValue('--brand-bg-accent').trim() || '#11402E'
  }
  if (!props.fg) {
    resolvedFg.value = styles.getPropertyValue('--brand-surface').trim() || '#F8F8F8'
  }
})

const svg = computed(() => {
  try {
    return renderMermaidSVG(props.code.trim(), {
      bg: resolvedBg.value || '#11402E',
      fg: resolvedFg.value || '#F8F8F8',
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
