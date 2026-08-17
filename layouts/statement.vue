<!-- Shadows @slidev/theme-default's statement layout to add the ambient
     background: carrying <ShaderBackground /> here keeps it out of every
     statement slide's markdown. A slide can still pick a different shader via
     frontmatter: `shader: godRays`. -->
<script setup>
// No default: an absent frontmatter key must stay undefined so ShaderBackground
// applies its own, rather than pinning a second copy of it here.
defineProps({
  shader: { type: String },
})
</script>

<template>
  <div class="slidev-layout statement">
    <ShaderBackground surface="light" :shader="shader" />
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
