import type { UserConfig, ConfigEnv } from 'vite'

import { resolve } from 'path'
import { loadEnv } from 'vite'

import { createViteProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { outDir, publicDir } from './build/constant'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const envDir = 'env'

  const env = loadEnv(mode, pathResolve(envDir)) as ImportMetaEnv

  const alias = {
    '/@': pathResolve('src'),
    // remove warning in dev
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
  }

  return {
    base: env.VITE_PUBLIC_PATH,

    envDir,

    publicDir,

    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },

    plugins: createVitePlugins(mode, env),

    resolve: {
      alias,
    },

    css: {},

    server: {
      host: env.VITE_HOST,

      port: env.VITE_PORT,

      proxy: createViteProxy(mode, env),

      open: '/',

      hmr: {
        overlay: false,
      },
    },

    build: {
      target: 'es2015',
      outDir,
      reportCompressedSize: false,

      chunkSizeWarningLimit: 600,

      sourcemap: mode === 'staging',

      // https://terser.org/docs/api-reference#minify-options
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: mode === 'production',
        },
      },

      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name].[hash].[ext]',
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',

          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('naive-ui')) {
                return 'naive-ui'
              }

              if (id.includes('easy-fns-ts')) {
                return 'easy-fns-ts'
              }

              if (id.includes('lodash-es')) {
                return 'lodash-es'
              }

              if (id.includes('date-fns')) {
                return 'date-fns'
              }

              if (id.includes('crypto-js')) {
                return 'crypto-js'
              }

              return 'vendor'
            }

            if (id.includes('src/')) {
              return 'src'
            }
          },
        },
      },
    },
  }
}
