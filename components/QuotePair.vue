<script setup>
defineProps({
  first: { type: String, required: true },
  firstAttribution: { type: String, default: '' },
  second: { type: String, required: true },
  secondAttribution: { type: String, default: '' },
})
</script>

<template>
  <div class="quote-pair">
    <h2>&ldquo;{{ first }}&rdquo;</h2>
    <p v-if="firstAttribution">{{ firstAttribution }}</p>
  </div>

  <v-click>
    <div class="quote-pair">
      <h2>&ldquo;{{ second }}&rdquo;</h2>
      <p v-if="secondAttribution">{{ secondAttribution }}</p>
    </div>
  </v-click>
</template>

<style scoped>
/* Same drawn rule as the quote layout's h1 — see the Motion section in
   styles/index.css, which owns the rule-draw keyframe. */
.quote-pair h2 {
  position: relative;
  padding-left: calc(1rem + 4px);
}

.quote-pair h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--brand-primary);
  transform-origin: top;
  animation: rule-draw var(--motion-slow) var(--motion-ease) both;
}

/* The second quote is click-revealed, and a v-click hides with opacity, not
   display — so the entry animation above would run behind the hidden block and
   the rule would arrive already drawn. Click-driven means transition (the
   deck's motion rule), which also makes it reversible: the hidden state rides
   the .slidev-vclick-hidden class, so stepping back re-collapses it and print
   (which steps click states and kills transitions) still lands fully drawn. */
.quote-pair.slidev-vclick-target h2::before {
  animation: none;
  transition: transform var(--motion-slow) var(--motion-ease);
}

.quote-pair.slidev-vclick-hidden h2::before {
  transform: scaleY(0);
}

/* Match the global rule: backward navigation is instant, and the global
   selector only covers the target element itself, not its pseudo-elements. */
:global(.slidev-nav-go-backward) .quote-pair.slidev-vclick-target h2::before {
  transition-duration: 0ms;
}
</style>
