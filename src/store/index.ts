import type { RemoveableRef } from '@vueuse/core'
import { UserInfoType } from './types/user'

type RemoveableRefRecord<T> = {
  [P in keyof T]: RemoveableRef<T[P]>
}

interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
    collapse: boolean
    device: ValueOfDevideConst
    isMobile: boolean
    showAside: boolean
    isFullScreen: boolean
    fullscreenTarget: string
  }

  token: string

  auth: {
    username?: string
    password?: string
  }
}

interface AppMemory {
  menu: {
    menus: AppMenu[]
    keepAliveRouteNames: string[]
    indexMenuName: string
  }

  user: {
    userInfo: Partial<UserInfoType>
  }

  tab: {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
    targetTab?: AppTab
    targetTabIndex?: number
    currentRouteName?: string
  }

  settings: {
    ForDevelopers: {
      app: {
        showLogo: boolean
        showMenu: boolean
        showHeader: boolean
        showTabs: boolean
        showFooter: boolean

        fixLogo: boolean
        fixHeader: boolean

        showAnimation: boolean
        animationName: ValueOfTransitionNameConst

        keepAlive: boolean
      }

      menu: {
        showCollapse: boolean
        collapseMode: ValueOfMenuCollapseModeConst
        width: number
        collapsedWidth: number
        accordion: boolean
        collapsedIconSize: number
        iconSize: number
        indent: number
        inverted: boolean
      }

      header: {
        height: number
        showBreadcrumb: boolean
        showFullScreen: boolean
        showLocale: boolean
        showDarkMode: boolean
        showLock: boolean
        showSearch: boolean
        inverted: boolean
      }

      tab: {
        height: number
        showIcon: boolean
        showUtils: boolean
        contextMenu: boolean
        sortable: boolean
        styleMode: ValueOfTabStyleModeConst
      }

      breadcrumb: {
        showIcon: boolean
        showDropdown: boolean
        separator: string
      }
    }

    ForUsers: {}
  }
}

const useAppStateStorage = createGlobalState<RemoveableRefRecord<AppStorage>>(
  () => ({
    app: useAppStorage(PersistentKeysConst.APP, {
      isDark: false,
      darkMode: 'light',
      locale: 'zh_CN',
      collapse: false,
      device: 'desktop',
      isMobile: false,
      showAside: false,
      isFullScreen: false,
      fullscreenTarget: '',
    }),
    token: useAppStorage(PersistentKeysConst.TOKEN, ''),
    auth: useAppStorage(PersistentKeysConst.AUTH, {}),
  })
)

const useAppStateMemory = createGlobalState<ToRefs<AppMemory>>(() =>
  toRefs(
    reactive({
      menu: {
        menus: [],
        keepAliveRouteNames: [],
        indexMenuName: '',
      },
      user: {
        userInfo: {},
      },
      tab: {
        tabs: [],
        visitedTabs: new Map(),
        targetTab: undefined,
        targetTabIndex: 0,
        currentRouteName: undefined,
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
