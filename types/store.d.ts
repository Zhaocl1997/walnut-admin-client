import type { RemovableRef } from '@vueuse/core'
import type {
  MessageReactive,
  NotificationReactive,
} from 'naive-ui'
import type {
  AppSettingsForApp,
  AppSettingsForBreadcrumb,
  AppSettingsForFooter,
  AppSettingsForHeader,
  AppSettingsForLogo,
  AppSettingsForMenu,
  AppSettingsForTabs,
  AppSettingsForTheme,
} from './settings'

declare global {
  /**
   * Naive UI message placement type
   */
  type MessagePlacement =
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'

  /**
   * Naive UI notification placement type
   */
  type NotificationPlacement = NotificationPlacement

  /**
   * Lock route info
   */
  interface AppLockRoute {
    name?: string
    query?: Recordable
    params?: Recordable
  }

  /**
   * App adapter state
   */
  interface AppAdapterState {
    device: ValueOfAppConstDevice
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
    locale: RemovableRef<ValueOfAppConstLocale>
  }

  /**
   * App lock state
   */
  interface AppLockState {
    isLock: RemovableRef<boolean>
    lockRoute: RemovableRef<AppLockRoute>
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
    notiMax: number
    msgMax: number
    notiPlacement: NotificationPlacement
    msgPlacement: MessagePlacement
    notiContainerStyle: CSSProperties
    currentNotiInst: Nullable<NotificationReactive>
    currentMsgInst: Nullable<MessageReactive>
  }

  /**
   * App setting retrieved from backend state
   */
  interface AppSettingBackendState {
    auth: Partial<AppPublicSettings.AuthSettings>
  }

  /**
   * App setting state
   */
  interface AppSettingState {
    themes: AppSettingsForTheme

    app: AppSettingsForApp

    logo: AppSettingsForLogo

    header: AppSettingsForHeader

    tabs: AppSettingsForTabs

    breadcrumb: AppSettingsForBreadcrumb

    menu: AppSettingsForMenu

    footer: AppSettingsForFooter
  }

  /**
   * App tab state
   */
  interface AppTabState {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
  }

  interface ExternalGeoIPInfo {
    country: string
    city: string
    region?: string
    ip: string
    isp: string
    longitude?: number
    latitude?: number
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
    accessToken?: RemovableRef<string>
    refreshToken?: RemovableRef<string>
    remember?: RemovableRef<Omit<AppPayloadAuth.Password, 'rememberMe'>>
  }

  /**
   * User permission state
   */
  interface UserPermissionState {
    permissions: string[]
  }

  interface UserScrollState {
    scrollEntries: RemovableRef<[string, { top: number, left?: number }][]>
  }
}

export { }
