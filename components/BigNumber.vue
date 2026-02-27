<script setup>
defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
  sublabel: { type: String, default: '' },
})
</script>

<template>
  <h1>{{ value }}</h1>
  <h2 class="mt-8 leading-tight max-w-4xl">
    {{ label }}
  </h2>
  <p v-if="sublabel" class="mt-2 opacity-75">{{ sublabel }}</p>
</template>
