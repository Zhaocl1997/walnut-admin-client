import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// dynamic usage is still problematic
export const createUnoCSSPlugin = (): VitePlugin[] => {
  return Unocss({
    shortcuts: {
      hstack: 'flex flex-row flex-nowrap',
      vstack: 'flex flex-col flex-nowrap',
    },

    theme: {
      colors: {
        // extend from naive-ui color
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-color-hover)',

        error: 'var(--error-color)',
        errorHover: 'var(--error-color-hover)',

        bodyColor: 'var(--body-color)',
      },
    },

    presets: [
      presetUno({
        dark: 'class',
      }),

      presetAttributify({
        prefix: 'w:',
      }),

      // maybe in the future?
      // presetIcons({
      //   prefix: 'wi-',
      //   extraProperties: {
      //     display: 'inline-block',
      //   },
      // }),
    ],
  })
}
