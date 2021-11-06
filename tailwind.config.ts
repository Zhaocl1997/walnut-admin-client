import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',

  alias: {
    hstack: 'flex flex-row flex-nowrap',
    vstack: 'flex flex-col flex-nowrap',
    appText: 'font-sans subpixel-antialiased',
  },

  attributify: {
    prefix: 'w:',
  },

  theme: {
    extend: {
      // usage `text-primary`
      textColor: {
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-color-hover)',
        error: 'var(--error-color)',
        errorHover: 'var(--error-color-hover)',
      },
      // usage `bg-primary`
      backgroundColor: {
        bodyColor: 'var(--body-color)',
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-color-hover)',
      },
      // usage `border-primary`
      borderColor: {
        primary: 'var(--primary-color) !important',
        primaryHover: 'var(--primary-color-hover) !important',
      },
    },
  },
})
