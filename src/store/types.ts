import type { UserInfoType } from './types/user'

export interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
  }

  token: string

  auth: {
    username?: string
    password?: string
  }
}

export interface AppMemory {
  appMemo: {
    collapse: boolean
    device: ValueOfDevideConst
    isMobile: boolean
    showAside: boolean
    isFullScreen: boolean
    fullscreenTarget: string
  }

  menu: {
    menus: AppMenu[]
    keepAliveRouteNames: string[]
    indexMenuName: string
    permissions: string[]
  }

  user: {
    userInfo: Partial<UserInfoType>
  }

  tab: {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
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
        devtool: boolean
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
