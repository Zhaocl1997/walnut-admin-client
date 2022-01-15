import type { RemovableRef } from '@vueuse/core'
import type { AppMemory, AppStorage } from './types'
import { defaultTheme } from '../settings/theme'
import { easyDeepClone } from 'easy-fns-ts'

const preferredLanguages = usePreferredLanguages()
const preferredColor = usePreferredColorScheme()

type RemoveableRefRecord<T> = {
  [P in keyof T]: RemovableRef<T[P]>
}

const useAppStateStorage = createGlobalState<RemoveableRefRecord<AppStorage>>(
  () => ({
    app: useAppStorage(PersistentKeysConst.APP, {
      isDark: preferredColor.value === 'dark' ? true : false,
      darkMode: preferredColor.value as ValueOfDarkModeConst,
      locale: preferredLanguages.value[0] as ValueOfLocaleConst,
    }),
    token: useAppStorage(PersistentKeysConst.TOKEN, ''),
    auth: useAppStorage(PersistentKeysConst.AUTH, {}),
  })
)

const useAppStateMemory = createGlobalState<ToRefs<AppMemory>>(() =>
  toRefs(
    reactive({
      appMemo: {
        collapse: false,
        device: 'desktop',
        isMobile: false,
        showAside: false,
      },
      menu: {
        menus: [],
        keepAliveRouteNames: [],
        indexMenuName: '',
        permissions: [],
      },
      user: {
        userInfo: {},
      },
      tab: {
        tabs: [],
        visitedTabs: new Map(),
      },

      settings: {
        ForDevelopers: {
          themes: easyDeepClone(defaultTheme.light),

          app: {
            showLogo: true,
            showMenu: true,
            showHeader: true,
            showTabs: true,
            showFooter: true,

            fixLogo: true,
            fixHeader: true,

            showAnimation: true,
            animationName: 'fade',

            keepAlive: true,
          },

          menu: {
            showCollapse: true,
            collapseMode: 'bar',
            width: 240,
            collapsedWidth: 64,
            accordion: false,
            collapsedIconSize: 24,
            iconSize: 26,
            indent: 16,
            inverted: false,
          },

          header: {
            height: 48,
            showBreadcrumb: true,
            showFullScreen: true,
            showLocale: true,
            showDarkMode: true,
            showLock: true,
            showSearch: true,
            inverted: false,
          },

          tab: {
            height: 32,
            showIcon: false,
            showUtils: true,
            contextMenu: true,
            sortable: false,
            styleMode: 'card',
            devtool: true,
          },

          breadcrumb: {
            showIcon: true,
            showDropdown: true,
            separator: '>',
          },
        },

        ForUsers: {},
      },
    })
  )
)

export const useAppState = () =>
  Object.assign(useAppStateStorage(), useAppStateMemory())
