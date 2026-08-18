<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { renderMermaidSVG } from 'beautiful-mermaid'

const props = defineProps({
  code: { type: String, required: true },
  size: { type: String, default: 'md' },
  bg: { type: String, default: null },
  fg: { type: String, default: null },
  /** 'stagger' builds the graph node by node on slide entry; 'none' renders it
      whole. Every diagram in the deck is a flow the speaker narrates in order,
      so stagger is the default. */
  reveal: {
    type: String,
    default: 'stagger',
    validator: v => ['stagger', 'none'].includes(v),
  },
})

const resolvedBg = ref(props.bg)
const resolvedFg = ref(props.fg)
const host = ref(null)
const { isPrintMode } = useNav()

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
      /* Tighter than the library defaults (40/40/24): the SVG scales down to
         the slide's content width, so every unit of intrinsic width shaves the
         effective text size. beautiful-mermaid exposes no font-size knob —
         spacing (and <br/>-wrapped labels in the mermaid source) is the only
         lever on how large the 13px node text renders. */
      padding: 20,
      layerSpacing: 28,
      nodeSpacing: 18,
    })
  } catch (e) {
    console.error('MermaidDiagram render error:', e)
    return `<pre style="color:red">${e.message}</pre>`
  }
})

/**
 * Tags each part of the rendered graph with the step it belongs to, which CSS
 * turns into an animation-delay (see the style block). Nodes go in the order
 * beautiful-mermaid emits them — source order — so the build traces the graph the
 * way the presenter notes walk it. Subgraph frames sit at step 0: they're the
 * scaffolding the nodes appear inside, not a beat of their own.
 *
 * An edge waits for the later of its two endpoints, not just its target. The
 * harness diagram carries feedback edges that point back at an earlier node
 * (Observe -> Model), and keying on the target alone drew those arrows out of a
 * node that hadn't appeared yet.
 *
 * Reads the rendered DOM rather than parsing the mermaid source, because
 * beautiful-mermaid already resolved ids, edges and containment. The cost is a
 * dependency on its output shape (`.node[data-id]`, `.edge[data-to]`), which is
 * not a documented contract — hence the bail-out below. A version bump that
 * renames those classes loses the stagger and keeps the diagram.
 */
function tagSteps() {
  const svgEl = host.value?.querySelector('svg')
  if (!svgEl) return

  const nodes = [...svgEl.querySelectorAll('.node[data-id]')]
  if (!nodes.length) return

  const stepById = new Map(nodes.map((node, i) => [node.dataset.id, i]))
  const apply = (el, step) => el.style.setProperty('--mm-step', step)

  nodes.forEach(node => apply(node, stepById.get(node.dataset.id)))
  svgEl.querySelectorAll('.edge[data-to], .edge-label[data-to]').forEach(edge => {
    const from = stepById.get(edge.dataset.from) ?? 0
    const to = stepById.get(edge.dataset.to) ?? 0
    apply(edge, Math.max(from, to))
  })
  svgEl.querySelectorAll('.subgraph').forEach(group => apply(group, 0))

  svgEl.classList.add('mm-staged')
}

const staged = computed(() => props.reveal === 'stagger' && !isPrintMode.value)

/** v-html replaces the whole subtree, and `svg` changes once after mount when the
    theme colours resolve — so tag on every render, not just the first. */
watch(
  [svg, staged],
  () => staged.value && nextTick(tagSteps),
  { immediate: true, flush: 'post' },
)

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
    ref="host"
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

/* beautiful-mermaid draws edge labels as stroked boxes — the same treatment as
   nodes, so a diagram looks like it has twice as many components as it does.
   Keep the fill (it occludes the edge line under the text) but drop the stroke,
   leaving labels reading as annotations rather than nodes. */
.mermaid-diagram :deep(svg .edge-label rect) {
  stroke: none;
}

/* The staged class is only ever added once every part carries a --mm-step, so an
   untagged diagram can't end up with its contents stuck at opacity 0. Steps are
   90ms apart: the widest graph here is 8 nodes, so the build lands in about a
   second — under the time it takes to say the first clause about it. */
.mermaid-diagram :deep(svg.mm-staged) > .node,
.mermaid-diagram :deep(svg.mm-staged) > .edge,
.mermaid-diagram :deep(svg.mm-staged) > .edge-label,
.mermaid-diagram :deep(svg.mm-staged) > .subgraph {
  animation: mm-node-in 380ms var(--motion-ease) both;
  animation-delay: calc(var(--mm-step, 0) * 90ms);
}

@keyframes mm-node-in {
  from {
    opacity: 0;
    /* transform-box makes the scale origin the element's own box rather than the
       SVG's, so a node grows in place instead of sliding toward the corner. */
    transform: scale(0.94);
  }
}

.mermaid-diagram :deep(svg.mm-staged) > * {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
