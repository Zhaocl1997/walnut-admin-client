import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import Terminal from 'vite-plugin-terminal'
import mkcert from 'vite-plugin-mkcert'
import Inspect from 'vite-plugin-inspect'

import { createComponentPlugin } from './component'
import { createVisualizerPlugin } from './visualizer'
import { createCompressionPlugin } from './compression'
import { createHTMLPlugin } from './html'
import { creatAutoImportPlugin } from './auto-import'
import { createUnoCSSPlugin } from './unocss'
import { createBannerPlugin } from './banner'
import { createRestartPlugin } from './restart'

export const createVitePlugins = (mode: string, env: ImportMetaEnv) => {
  const vitePlugins: (VitePlugin | VitePlugin[])[] = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('cropper-'),
        },
      },
    }),
    vueJsx(),
  ]

  const dev = mode === 'development'
  const stage = mode === 'staging'
  const prod = mode === 'production'

  // https://github.com/patak-dev/vite-plugin-terminal
  // I'm pretty sure that this package will be removed when build
  // It's just a symbol to tell you that when this plugin will be used
  if (dev)
    vitePlugins.push(
      Terminal({ output: ['console', 'terminal'] }) as unknown as VitePlugin
    )

  // https://github.com/liuweiGL/vite-plugin-mkcert
  if (dev) vitePlugins.push(mkcert({ source: 'coding' }))

  // https://github.com/antfu/vite-plugin-inspect
  if (dev) vitePlugins.push(Inspect())

  // https://github.com/antfu/vite-plugin-restart
  if (dev) vitePlugins.push(createRestartPlugin())

  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(creatAutoImportPlugin())

  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(createComponentPlugin())

  // https://github.com/unocss/unocss
  vitePlugins.push(createUnoCSSPlugin())

  // https://github.com/anncwb/vite-plugin-html
  vitePlugins.push(createHTMLPlugin(env.VITE_APP_TITLE))

  // https://github.com/btd/rollup-plugin-visualizer
  if (stage) vitePlugins.push(createVisualizerPlugin(env.VITE_APP_TITLE))

  // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
  if (prod) vitePlugins.push(legacy())

  // https://github.com/anncwb/vite-plugin-compression
  if (prod) vitePlugins.push(createCompressionPlugin())

  // https://github.com/chengpeiquan/vite-plugin-banner
  if (prod) vitePlugins.push(createBannerPlugin())

  return vitePlugins
}
