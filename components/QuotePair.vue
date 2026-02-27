<script setup>
defineProps({
  first: { type: String, required: true },
  firstAttribution: { type: String, default: '' },
  second: { type: String, required: true },
  secondAttribution: { type: String, default: '' },
})
</script>

<template>
  <h1>&ldquo;{{ first }}&rdquo;</h1>

  <p v-if="firstAttribution">{{ firstAttribution }}</p>

  <v-click>
    <h2>&ldquo;{{ second }}&rdquo;</h2>
    <p v-if="secondAttribution">{{ secondAttribution }}</p>
  </v-click>
</template>
