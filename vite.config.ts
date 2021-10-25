import type { UserConfig, ConfigEnv } from 'vite'

import { resolve } from 'path'
import { loadEnv } from 'vite'

import { createViteProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const getServerHost = (env: ImportMetaEnv) => {
  const host = env.VITE_PROXY_HOST
  return host.includes('http') ? host.slice(7) : ''
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const envPath = 'env'

  const env = loadEnv(mode, pathResolve(envPath)) as ImportMetaEnv

  const alias = {
    '/@': pathResolve('src'),
    // remove warning in dev
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
  }

  return {
    base: env.VITE_PUBLIC_PATH,

    envDir: envPath,

    define: {
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },

    plugins: createVitePlugins(mode, env),

    resolve: {
      alias: alias,
    },

    css: {},

    server: {
      host: getServerHost(env),

      port: env.VITE_PORT,

      proxy: createViteProxy(mode, env),

      open: '/',

      hmr: {
        overlay: false,
      },
    },

    build: {
      brotliSize: false,
      sourcemap: mode === 'staging',
      rollupOptions: {
        output: {
          // For 2.1.5 has `Maximum call stack size exceeded` error. See below.
          // https://github.com/vitejs/vite/issues/2906
          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
}
