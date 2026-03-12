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
.quote-pair h2 {
  border-left: 4px solid var(--brand-primary);
  padding-left: 1rem;
}
</style>
