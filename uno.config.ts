import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      brand: {
        primary: 'var(--brand-primary)',
        text: 'var(--brand-text)',
        bg: 'var(--brand-bg)',
        'bg-accent': 'var(--brand-bg-accent)',
        link: 'var(--brand-link)',
        surface: 'var(--brand-surface)',
        'on-accent': 'var(--brand-on-accent)',
      },
    },
  },
})
