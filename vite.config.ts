import type { UserConfig, ConfigEnv } from 'vite'

import { resolve } from 'node:path'
import { loadEnv, splitVendorChunkPlugin } from 'vite'

import { getNow } from 'easy-fns-ts/dist/lib'

import { createViteProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { envDir, publicDir } from './build/constant'
import { createRollupObfuscatorPlugin } from './build/rollup'

import { useAppEnv } from './src/hooks/core/useAppEnv'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const __APP_INFO__ = {
  lastBuildTime: getNow(),
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, pathResolve(envDir)) as ImportMetaEnv

  const { obfuscator, dropConsole, outDir, publicPath } = useAppEnv(
    'build',
    env
  )

  return {
    root,

    base: publicPath,

    envDir,

    publicDir,

    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    plugins: [...createVitePlugins(mode, env), splitVendorChunkPlugin()],

    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },

    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },

    esbuild: {
      pure: dropConsole ? ['console.log', 'debugger'] : [],
    },

    server: {
      host: env.VITE_HOST,

      port: env.VITE_PORT,

      proxy: createViteProxy(mode, env),

      open: '/',

      hmr: {
        overlay: false,
      },

      // https: true,
    },

    build: {
      target: 'es2015',
      minify: 'esbuild',
      outDir,
      reportCompressedSize: false,

      chunkSizeWarningLimit: 600,

      // sourcemap: mode === 'staging',

      rollupOptions: {
        external: ['chalk', /^node:.*/],
        output: {
          assetFileNames: '[ext]/[name].[hash].[ext]',
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',

          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks: {
            'lodash-es': ['lodash-es'],
            'naive-ui': ['naive-ui'],
            'ali-oss': ['ali-oss'],
            echarts: ['echarts'],
            tinymce: ['tinymce'],
            sortablejs: ['sortablejs'],
            axios: ['axios'],
            signature_pad: ['signature_pad'],
            'vue-i18n': ['vue-i18n'],
            'highlight.js': ['highlight.js'],
            'intro.js': ['intro.js'],
            codemirror: ['codemirror'],
            cropperjs: ['cropperjs'],
          },

          plugins: [obfuscator ? createRollupObfuscatorPlugin() : {}],
        },
      },
    },
  }
}
