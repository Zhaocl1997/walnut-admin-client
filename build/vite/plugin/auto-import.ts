import AutoImport from 'unplugin-auto-import/vite'

export const creatAutoImportPlugin = (): VitePlugin => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],

    dts: 'types/auto-import.d.ts',

    imports: [
      // presets
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/core',

      // custom
      {
        '/@/const': [
          'DevideConst',
          'DarkModeConst',
          'LocaleConst',
          'MenuTypeConst',
          'MenuTernalConst',
          'PersistentKeysConst',
          'StorageTypeConst',
          'SymbolKeyConst',
          'TransitionNameConst',
          'DeleteTabConst',
          'MenuCollapseModeConst',
          'TabStyleModeConst',
          'AppLayoutModeConst',
          'AppLockModeConst',
        ],

        '/@/locales': ['useAppI18n', 'AppI18n'],
        '/@/router': [
          'AppRouter',
          'useAppRoute',
          'useAppRouter',
          'useRouterPush',
        ],

        // pinia store modules
        '/@/store/modules/app/app-adapter': ['useAppAdapterStore'],
        '/@/store/modules/app/app-dark': ['useAppDarkStore'],
        '/@/store/modules/app/app-key': ['useAppKeyStore'],
        '/@/store/modules/app/app-locale': ['useAppLocaleStore'],
        '/@/store/modules/app/app-lock': ['useAppLockStore'],
        '/@/store/modules/app/app-menu': ['useAppMenuStore'],
        '/@/store/modules/app/app-msg': ['useAppMsgStore'],
        '/@/store/modules/app/app-setting': ['useAppSettingStore'],
        '/@/store/modules/app/app-tab': ['useAppTabStore'],
        '/@/store/modules/user/user-auth': ['useUserAuthStore'],
        '/@/store/modules/user/user-profile': ['useUserProfileStore'],
        '/@/store/modules/user/user-permission': ['useUserPermissionStore'],

        // hooks
        '/@/hooks/core/useContext': ['useContext'],
        '/@/hooks/core/usePermissions': ['usePermissions'],
        '/@/hooks/core/useState': ['useState'],
        '/@/hooks/core/useDict': ['useDict', 'AppDictMap'],

        // message
        '/@/hooks/component/useMessage': [
          'useAppMessage',
          'AppMsg',
          'useAppMsgSuccess2',
          'useAppMsgInfo',
          'useAppMsgWarning',
          'useAppMsgError',
        ],

        // notification
        '/@/hooks/component/useNoti': [
          'useAppNotification',
          'AppNoti',
          'useAppNotiSuccess',
          'useAppNotiInfo',
          'useAppNotiWarning',
          'useAppNotiError',
        ],

        // confirm
        '/@/hooks/component/useConfirm': ['useAppConfirm'],

        '/@/utils/axios': ['AppAxios'],
        '/@/utils/persistent': ['useAppStorage'],
        '/@/utils/factory/asyncComponent': ['createAsyncComponent'],
        '/@/utils/window/open': ['openExternalLink'],

        '/@/utils/log/combine': ['AppLog', 'AppInfo', 'AppWarn', 'AppError'],

        '/@/components/UI/Form': ['useForm'],
        '/@/components/UI/Table': ['useTable'],
        '/@/components/Advanced/CRUD': ['useCRUD'],

        // table preset columns
        '/@/components/UI/Table/src/utils/presetColumns': [
          'WTablePresetOrderColumn',
          'WTablePresetStatusColumn',
          'WTablePresetCreatedAtColumn',
          'WTablePresetUpdatedAtColumn',
        ],
      },
    ],
  })
}
