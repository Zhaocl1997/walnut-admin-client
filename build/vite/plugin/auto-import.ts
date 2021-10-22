import AutoImport from 'unplugin-auto-import/vite'

// TODO waiting for types auto import
export const creatAutoImportPlugin = (): VitePlugin => {
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

        '/@/const': [
          'DarkModeConst',
          'LocaleConst',
          'MenuTypeConst',
          'MenuTernalConst',
          'PersistentKeysConst',
          'StorageTypeConst',
          'SymbolKeyConst',
          'TransitionNameConst',
          'DeleteTabConst',
        ],

        '/@/locales': ['useAppI18n', 'AppI18n'],
        '/@/router': [
          'AppRouter',
          'useAppRoute',
          'useAppRouter',
          'useRouterPush',
        ],
        '/@/store': ['useAppStateStorage', 'useAppStateMemory'],

        '/@/hooks/core/useContext': ['useContext'],
        '/@/hooks/component/useMessage': [
          'useAppMessage',
          'useAppNotification',
          'useAppDialog',
          'useContinue',
        ],

        '/@/utils/axios': ['AppAxios'],
        '/@/utils/persistent': ['useAppStorage'],

        '/@/components/UI/Form': ['useForm'],
        '/@/components/UI/Table': ['useTable'],
      },
    ],
    dts: 'types/auto-import.d.ts',
  })
}
