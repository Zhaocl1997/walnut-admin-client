import Unocss from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'

// dynamic usage is still problematic
export const createUnoCSSPlugin = (): VitePlugin[] => {
  return Unocss({
    presets: [
      presetUno(),
      presetIcons({
        prefix: 'wi-',
        extraProperties: {
          display: 'inline-block',
        },
      }),
    ],
  })
}
