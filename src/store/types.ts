import type { UserInfoType } from './types/user'

export interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
    isLock: boolean
    lockMode: ValueOfAppLockModeConst
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
      themes: AppThemeColors

      app: {
        showLogo: boolean
        showMenu: boolean
        showHeader: boolean
        showTabs: boolean
        showFooter: boolean

        fixLogo: boolean
        fixHeader: boolean
        fixFooter: boolean

        showAnimation: boolean
        animationName: ValueOfTransitionNameConst

        keepAlive: boolean

        layout: ValueOfAppLayoutModeConst

        pageLeaveLock: boolean
        idleMS: number
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
