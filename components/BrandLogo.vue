<script setup>
import { computed, onMounted, ref } from 'vue'

const theme = ref('melatech')

onMounted(() => {
  theme.value = document.documentElement.dataset.theme || 'melatech'
})

const logos = {
  melatech: { src: '/melatech-logo.svg', alt: 'Melatech' },
  consensus: { src: '/consensus-logo.svg', alt: 'Consensus' },
}

const logo = computed(() => logos[theme.value] || logos.melatech)
</script>

<template>
  <img :src="logo.src" :alt="logo.alt" class="absolute bottom-10 right-14 w-48 logo-breathe" />
</template>
