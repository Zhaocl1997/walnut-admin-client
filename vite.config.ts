import type { UserConfig, ConfigEnv } from 'vite'

import { resolve } from 'path'
import { loadEnv, splitVendorChunkPlugin } from 'vite'

import { getNow } from 'easy-fns-ts/dist/lib'

import { createViteProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { outDir, publicDir } from './build/constant'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const __APP_INFO__ = {
  lastBuildTime: getNow(),
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const envDir = 'env'

  const env = loadEnv(mode, pathResolve(envDir)) as ImportMetaEnv

  const alias = {
    '@': pathResolve('src'),
  }

  return {
    base: env.VITE_PUBLIC_PATH,

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
      alias,
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

    // esbuild: {
    //   pure: ['console.log', 'debugger'],
    // },

    build: {
      target: 'es2015',
      minify: 'esbuild',
      outDir,
      reportCompressedSize: false,

      chunkSizeWarningLimit: 600,

      // sourcemap: mode === 'staging',

      // minify: 'terser',
      // // https://terser.org/docs/api-reference#minify-options
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: mode === 'production',
      //   },
      // },

      rollupOptions: {
        external: ['virtual:terminal'],
        output: {
          assetFileNames: '[ext]/[name].[hash].[ext]',
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',

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

          // https://rollupjs.org/guide/en/#outputmanualchunks
          // manualChunks(id) {
          //   if (id.includes('node_modules/.pnpm')) {
          //     return id
          //       .toString()
          //       .split('node_modules/.pnpm/')[1]
          //       .split('/')[0]
          //       .toString()
          //   }

          //   // if (id.includes('src/')) {
          //   //   return 'src'
          //   // }
          // },
        },
      },
    },
  }
}
