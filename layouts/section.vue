<!-- Shadows @slidev/theme-default's section layout to add the ambient
     background, the same way layouts/statement.vue does — the seven dividers
     all want the identical tag, and `:opacity="0.22"` is the measured input to
     the contrast floor in AGENTS.md, so it lives in one place. -->
<template>
  <div class="slidev-layout section w-full h-full grid">
    <ShaderBackground shader="godRays" :opacity="0.22" />
    <div class="my-auto text-center">
      <slot />
    </div>
  </div>
</template>
