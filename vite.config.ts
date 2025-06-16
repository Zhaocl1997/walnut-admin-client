import type { ConfigEnv, UserConfig } from 'vite'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { loadEnv } from 'vite'

import { envDir, publicDir } from './build/constant'

import { createRollupObfuscatorPlugin } from './build/rollup'
import { createVitePlugins } from './build/vite/plugin'
import { createViteProxy } from './build/vite/proxy'
import { author, dependencies, devDependencies, name, repository, urls, version } from './package.json'

function useBuildEnv(env: ImportMetaEnv) {
  return {
    title: env.VITE_APP_TITLE,
    obfuscator: +env.VITE_BUILD_OBFUSCATOR === 1,
    dropConsole: +env.VITE_BUILD_DROP_CONSOLE === 1,
    compression: +env.VITE_BUILD_COMPRESSION === 1,
    https: +env.VITE_DEV_HTTPS === 1,
    cdn: +env.VITE_BUILD_CDN === 1,
    outDir: env.VITE_BUILD_OUT_DIR,
    publicPath: env.VITE_PUBLIC_PATH,
  }
}

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const __APP_INFO__ = {
  name,
  version,
  deps: dependencies,
  devDeps: devDependencies,
  urls: Object.assign(urls, {
    github: repository.url,
    author: author.url,
  }),
  lastBuildTime: new Date().toLocaleDateString(),
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = cwd()

  const env = loadEnv(mode, pathResolve(envDir)) as ImportMetaEnv

  const processedEnv = useBuildEnv(env)

  return {
    root,

    base: processedEnv.publicPath,

    envDir,

    publicDir,

    define: {
      // https://vue-i18n.intlify.dev/guide/advanced/optimization#feature-build-flags
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    plugins: [...createVitePlugins(mode, processedEnv)],

    resolve: {
      alias: {
        '@': pathResolve('src'),
        // https://github.com/axios/axios/issues/5000#issuecomment-1362395864
        'axios/lib': resolve(__dirname, './node_modules/axios/lib'),
      },
    },

    css: {},

    esbuild: {
      drop: processedEnv.dropConsole ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },

    server: {
      host: env.VITE_HOST,

      port: env.VITE_PORT,

      proxy: createViteProxy(env),

      open: '/',

      hmr: {
        overlay: false,
      },
    },

    preview: {
      port: 8080,
      strictPort: true,
      host: true,
      open: true,
    },

    build: {
      minify: 'esbuild',
      outDir: processedEnv.outDir,
      reportCompressedSize: false,

      chunkSizeWarningLimit: 600,

      rollupOptions: {
        external: ['chalk', /^node:.*/],
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks: {
            'lodash-es': ['lodash-es'],
            // 'naive-ui': ['naive-ui'],
            // 'ali-oss': ['ali-oss'],
            // 'echarts': ['echarts'],
            'tinymce': ['tinymce'],
            'sortablejs': ['sortablejs'],
            'axios': ['axios'],
            'signature_pad': ['signature_pad'],
            'vue-i18n': ['vue-i18n'],
            'highlight.js': ['highlight.js'],
            'intro.js': ['intro.js'],
            'codemirror': ['codemirror'],
            'cropperjs': ['cropperjs'],
          },

          plugins: [processedEnv.obfuscator ? createRollupObfuscatorPlugin() : undefined],
        },
      },
    },
  }
}
