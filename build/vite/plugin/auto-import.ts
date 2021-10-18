import type { Plugin } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'

// TODO waiting for types auto import
export const creatAutoImportPlugin = (): Plugin => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: [
      // presets
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/core',

      // custom
      {
        '/@/App': ['useAppContext'],
        '/@/locales': ['useAppI18n', 'AppI18n'],
        '/@/router': [
          'AppRouter',
          'useAppRoute',
          'useAppRouter',
          'useRouterPush',
        ],
        '/@/hooks/core/useContext': ['useContext'],
        '/@/hooks/component/useMessage': [
          'useAppMessage',
          'useAppNotification',
          'useAppDialog',
          'useContinue',
        ],
        '/@/utils/axios': ['AppAxios'],
        '/@/components/UI/Form': ['useForm'],
        '/@/components/UI/Table': ['useTable'],
      },
    ],
    dts: 'types/auto-import.d.ts',
  })
}
