import type { RemovableRef } from '@vueuse/core'
import type { NotificationPlacement } from 'naive-ui'

declare global {
  type MessagePlacement =
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'

  type NotificationPlacement = NotificationPlacement
  interface AppState {
    device: ValueOfDevideConst
    isMobile: boolean
  }

  interface AppDarkState {
    darkMode: RemovableRef<ValueOfDarkModeConst>
    isDark: RemovableRef<boolean>
  }

  interface AppKeyState {
    baiduAK?: string
  }

  interface AppLocaleState {
    locale: RemovableRef<ValueOfLocaleConst>
  }

  interface AppLockState {
    lockMode: RemovableRef<ValueOfAppLockModeConst>
    isLock: RemovableRef<boolean>
  }

  interface AppMenuState {
    collapse: boolean
    showAside: boolean

    menus: AppSystemMenu[]
    keepAliveRouteNames: string[]
    indexMenuName?: string
  }

  interface AppMsgState {
    notiPlacement: NotificationPlacement
    msgPlacement: MessagePlacement
  }

  interface AppSettingState {
    settings: AppSettings
  }

  interface AppTabState {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
  }

  interface UserState {
    profile: Partial<AppSystemUser>
  }

  interface UserAuthState {
    access_token?: RemovableRef<string>
    refresh_token?: RemovableRef<string>

    remember?: RemovableRef<{
      userName: string
      password: string
    }>
  }

  interface UserPermissionState {
    permissions: string[]
  }
}

export {}
