import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',

  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      zIndex: {
        2000: 2000,
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
    },
  },
})
