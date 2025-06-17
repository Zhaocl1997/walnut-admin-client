import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'
import { creatAutoImportPlugin } from './auto-import'
import { createBannerPlugin } from './banner'
import { createCdnImportPlugin } from './cdn-import'
import { createCheckerPlugin } from './checker'
import { createComponentPlugin } from './component'
import { createCompressionPlugin } from './compression'
import { createDevtoolsPlugin } from './devtool'
import { createHttpsPlugin } from './https'
import { createImageOptimizerPlugin } from './image-optimizer'
import { createLegacyPlugin } from './legacy'
import { createObfuscatorPlugin } from './obfuscator'
import { createRestartPlugin } from './restart'
import { createTurboConsolePlugin } from './turbo-console'
import { createUnoCSSPlugin } from './unocss'
import { creatValidateEnvPlugin } from './validate-env'
import { createVisualizerPlugin } from './visualizer'

export function createVitePlugins(mode: string, env: IViteEnv) {
  const vitePlugins: PluginOption = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('cropper-'),
        },
      },
    }),
    vueJsx(),

    // https://github.com/Julien-R44/vite-plugin-validate-env
    creatValidateEnvPlugin(mode),

    // https://github.com/antfu/unplugin-auto-import
    creatAutoImportPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    createComponentPlugin(),

    // https://github.com/unocss/unocss
    createUnoCSSPlugin(),

    // https://github.com/fi3ework/vite-plugin-checker
    // createCheckerPlugin(),

    // https://github.com/vitejs/vite/issues/3033#issuecomment-1360691044
    // {
    //   name: 'singleHMR',
    //   handleHotUpdate({ modules }) {
    //     modules.forEach((m) => {
    //       m.importedModules = new Set()
    //       m.importers = new Set()
    //     })

    //     return modules
    //   },
    // },
  ]

  const dev = mode === 'development'

  // I'm pretty sure packages below will be removed when build
  // It's just a symbol to tell you that when this plugin will be used
  if (dev) {
    // https://github.com/vuejs/devtools
    vitePlugins.push(createDevtoolsPlugin())

    // https://github.com/unplugin/unplugin-turbo-console
    vitePlugins.push(createTurboConsolePlugin())

    // https://github.com/antfu/vite-plugin-restart
    vitePlugins.push(createRestartPlugin())

    // https://github.com/liuweiGL/vite-plugin-mkcert
    env.https && vitePlugins.push(createHttpsPlugin())
  }
  else {
    // https://github.com/FatehAK/vite-plugin-image-optimizer
    vitePlugins.push(createImageOptimizerPlugin())

    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    vitePlugins.push(createLegacyPlugin())

    // https://github.com/nonzzz/vite-plugin-cdn
    env.cdn && vitePlugins.push(createCdnImportPlugin())

    // https://github.com/nonzzz/vite-plugin-compression
    env.compression && vitePlugins.push(createCompressionPlugin())

    // https://github.com/z0ffy/vite-plugin-bundle-obfuscator
    env.obfuscator && vitePlugins.push(createObfuscatorPlugin())

    // https://github.com/chengpeiquan/vite-plugin-banner
    env.banner && vitePlugins.push(createBannerPlugin(env.outDir))

    // https://github.com/btd/rollup-plugin-visualizer
    env.analyzer && vitePlugins.push(createVisualizerPlugin(env.title))
  }

  return vitePlugins
}
