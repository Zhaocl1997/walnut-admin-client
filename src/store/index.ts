import type { RemovableRef } from '@vueuse/core'
import type { AppMemory, AppStorage } from './types'

const preferredLanguages = usePreferredLanguages()
const preferredColor = usePreferredColorScheme()

type RemoveableRefRecord<T> = {
  [P in keyof T]: RemovableRef<T[P]>
}

const useAppStateStorage = createGlobalState<RemoveableRefRecord<AppStorage>>(
  () => ({
    app: useAppStorage(PersistentKeysConst.APP, {
      isDark: false,
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
        isFullScreen: false,
        fullscreenTarget: '',
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
            inverted: true,
          },

          header: {
            height: 48,
            showBreadcrumb: true,
            showFullScreen: true,
            showLocale: true,
            showDarkMode: true,
            showLock: true,
            showSearch: true,
            inverted: true,
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

useAppStateStorage()
useAppStateMemory()

export const useAppState = () =>
  Object.assign(useAppStateStorage(), useAppStateMemory())
