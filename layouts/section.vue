<!-- Shadows @slidev/theme-default's section layout to add the ambient
     background, the same way layouts/statement.vue does — the seven dividers
     all want the identical tag, and `:opacity="0.22"` is the measured input to
     the contrast floor in AGENTS.md, so it lives in one place.

     godRays only advances time as a radial drift through its noise field, so it
     reads as near-frozen at the component's default speed. 0.6 crosses a noise
     cell about every 3s — visible life, ~0.36Hz, nowhere near WCAG 2.3.1's 3Hz
     flash threshold. Set here rather than as a per-shader default because
     statement slides can also select godRays, and they sit on the `light`
     surface where speed is load-bearing for that threshold. -->
<template>
  <div class="slidev-layout section w-full h-full grid">
    <ShaderBackground shader="godRays" :opacity="0.22" :speed="0.6" />
    <div class="my-auto text-center">
      <slot />
    </div>
  </div>
</template>
