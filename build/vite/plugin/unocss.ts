import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

// dynamic usage is still problematic
export const createUnoCSSPlugin = (): VitePlugin[] => {
  return UnoCSS({
    shortcuts: {
      hstack: 'flex flex-row flex-nowrap',
      vstack: 'flex flex-col flex-nowrap',
    },

    theme: {
      colors: {
        // extend from naive-ui color
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-color-hover)',

        info: 'var(--info-color)',
        infoHover: 'var(--info-color-hover)',

        error: 'var(--error-color)',
        errorHover: 'var(--error-color-hover)',

        bodyColor: 'var(--body-color)',
        bodyHover: 'var(--body-color-hover)',
      },
    },

    presets: [
      presetUno({
        dark: 'class',
      }),

      presetAttributify({
        prefix: 'w:',
      }),
    ],

    transformers: [transformerVariantGroup()],
  })
}
