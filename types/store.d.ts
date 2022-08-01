import type { RemovableRef } from '@vueuse/core'
import type { NotificationPlacement } from 'naive-ui'

declare global {
  /**
   * Naive ui message placement type
   */
  type MessagePlacement =
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'

  /**
   * Naive ui notification placement type
   */
  type NotificationPlacement = NotificationPlacement

  /**
   * Use password and user name to sign in interface
   */
  interface PasswordSigninPayload {
    userName: string
    password: string
    rememberMe?: boolean
  }

  /**
   * App adapter state
   */
  interface AppAdapterState {
    device: ValueOfDevideConst
  }

  /**
   * App dark state
   */
  interface AppDarkState {
    darkMode: RemovableRef<ValueOfDarkModeConst>
    isDark: RemovableRef<boolean>
  }

  /**
   * App secret key state
   */
  interface AppKeyState {
    baiduAK?: string
  }

  /**
   * App locale state
   */
  interface AppLocaleState {
    locale: RemovableRef<ValueOfLocaleConst>
  }

  /**
   * App lock state
   */
  interface AppLockState {
    lockMode: RemovableRef<ValueOfAppLockModeConst>
    isLock: RemovableRef<boolean>
  }

  /**
   * App menu state
   */
  interface AppMenuState {
    collapse: boolean
    showAside: boolean

    menus: AppSystemMenu[]
    keepAliveRouteNames: string[]
    indexMenuName?: string
  }

  /**
   * App naive ui message/notificaiton placement state
   */
  interface AppMsgState {
    notiPlacement: NotificationPlacement
    msgPlacement: MessagePlacement
  }

  /**
   * App setting state
   */
  interface AppSettingState {
    settings: AppSettings
  }

  /**
   * App tab state
   */
  interface AppTabState {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
  }

  /**
   * User profile state
   */
  interface UserProfileState {
    profile: Partial<AppSystemUser>
  }

  /**
   * User auth state
   */
  interface UserAuthState {
    access_token?: RemovableRef<string>
    refresh_token?: RemovableRef<string>
    remember?: RemovableRef<Omit<PasswordSigninPayload, 'rememberMe'>>
  }

  /**
   * User permission state
   */
  interface UserPermissionState {
    permissions: string[]
  }
}

export {}
