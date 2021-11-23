import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import { createWindicssPlugin } from './windicss'
import { createComponentPlugin } from './component'
import { createVisualizerPlugin } from './visualizer'
import { createCompressionPlugin } from './compression'
import { createHTMLPlugin } from './html'
import { creatAutoImportPlugin } from './auto-import'

export const createVitePlugins = (mode: string, env: ImportMetaEnv) => {
  const vitePlugins: (VitePlugin | VitePlugin[])[] = [vue(), vueJsx()]

  const stage = mode === 'staging'
  const prod = mode === 'production'

  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(creatAutoImportPlugin())

  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(createComponentPlugin())

  // https://github.com/windicss/vite-plugin-windicss
  vitePlugins.push(createWindicssPlugin())

  // https://github.com/anncwb/vite-plugin-html
  vitePlugins.push(createHTMLPlugin(env.VITE_APP_TITLE))

  // https://github.com/btd/rollup-plugin-visualizer
  stage && vitePlugins.push(createVisualizerPlugin(env.VITE_APP_TITLE))

  // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
  prod && vitePlugins.push(legacy())

  // https://github.com/anncwb/vite-plugin-compression
  prod && vitePlugins.push(createCompressionPlugin())

  return vitePlugins
}
