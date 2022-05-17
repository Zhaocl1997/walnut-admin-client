export interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
    isLock: boolean
    lockMode: ValueOfAppLockModeConst
  }

  token: string
  refresh_token: string

  auth: {
    userName?: string
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
    menus: AppSystemMenu[]
    keepAliveRouteNames: string[]
    indexMenuName: string
    permissions: string[]
  }

  user: {
    userInfo: Partial<AppUserInfoInterface>
  }

  tab: {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
  }

  settings: {
    ForDevelopers: AppSettings

    ForUsers: {}
  }
}
