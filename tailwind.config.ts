import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',

  attributify: {
    prefix: 'w:',
  },

  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      zIndex: {
        2000: 2000,
      },
    },
  },
})
