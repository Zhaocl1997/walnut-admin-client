import type { Plugin } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'

// TODO waiting for type auto import
export const creatAutoImportPlugin = (): Plugin => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/core',
      {
        '/@/App': ['useAppContext'],
        '/@/locales': ['useAppI18n'],
        '/@/router': [
          'AppRouter',
          'useAppRoute',
          'useAppRouter',
          'useRouterPush',
        ],
        '/@/hooks/core/useContext': ['useContext'],
        '/@/utils/axios': ['AppAxios'],
        '/@/components/UI/Form': ['useForm'],
      },
    ],
    dts: 'types/auto-import.d.ts',
  })
}
