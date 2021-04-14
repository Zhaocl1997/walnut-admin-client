import type { Plugin } from 'vite'
import type { ImportMetaEnv } from '../../../types/env'

import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { createWindicssPlugin } from './windicss'
import { createComponentPlugin } from './component'
import { createVisualizerPlugin } from './visualizer'
import { createStyleImportPlugin } from './styleImport'
import { createCompressionPlugin } from './compression'
import { createHTMLPlugin } from './html'
import { createI18nPlugin } from './i18n'

export const createVitePlugins = (mode: string, env: ImportMetaEnv) => {
  const vitePlugins: (Plugin | Plugin[])[] = [vue()]

  const stage = mode === 'staging'
  const prod = mode === 'production'

  // https://github.com/antfu/vite-plugin-components
  vitePlugins.push(createComponentPlugin())

  // https://github.com/windicss/vite-plugin-windicss
  vitePlugins.push(createWindicssPlugin())

  // https://github.com/anncwb/vite-plugin-html
  vitePlugins.push(createHTMLPlugin(env.VITE_APP_TITLE))

  // https://github.com/intlify/vite-plugin-vue-i18n
  vitePlugins.push(createI18nPlugin())

  // https://github.com/btd/rollup-plugin-visualizer
  stage && vitePlugins.push(createVisualizerPlugin())

  // https://github.com/anncwb/vite-plugin-style-import
  // vitePlugins.push(createStyleImportPlugin())

  // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
  prod && vitePlugins.push(legacy())

  // https://github.com/anncwb/vite-plugin-compression
  prod && vitePlugins.push(createCompressionPlugin())

  return vitePlugins
}
