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
   styles/index.css, which owns the rule-draw keyframe. The second quote is
   click-revealed, so its rule has already drawn behind the hidden block and
   arrives complete; only the first one draws in front of the room. */
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
</style>
