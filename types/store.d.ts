import type { RemovableRef } from '@vueuse/core'
import type { Nullable } from 'easy-fns-ts'
import type {
  MessageReactive,
  NotificationReactive,
} from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { RouteRecordNameGeneric } from 'vue-router'
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
  interface IAppStoreAdapter {
    device: ValueOfAppConstDevice
  }

  /**
   * App cached views state
   */
  interface IAppStoreCachedViews {
    cachedViewNameList: RouteRecordNameGeneric[]
  }

  /**
   * App secret key state
   */
  interface IAppStoreKey {
    baiduAK?: string
  }

  /**
   * App locale state
   */
  interface IAppStoreLocale {
    locale: RemovableRef<ValueOfAppConstLocale>
  }

  /**
   * App lock state
   */
  interface IAppStoreLock {
    isLock: RemovableRef<boolean>
    lockRoute: RemovableRef<AppLockRoute>
  }

  /**
   * App menu state
   */
  interface IAppStoreMenu {
    collapse: boolean
    showAside: boolean

    menus: AppSystemMenu[]
    keepAliveRouteNames: string[]
    indexMenuName?: string
  }

  /**
   * App naive ui message/notificaiton placement state
   */
  interface IAppStoreMsg {
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
  interface IAppStoreSettingBackend {
    auth: Partial<AppPublicSettings.AuthSettings>
  }

  /**
   * App setting state
   */
  interface IAppStoreSetting {
    themes: AppSettingsForTheme

    app: AppSettingsForApp

    logo: AppSettingsForLogo

    header: AppSettingsForHeader

    tabs: AppSettingsForTabs

    breadcrumb: AppSettingsForBreadcrumb

    menu: AppSettingsForMenu

    footer: AppSettingsForFooter
  }

  type IAppTabIframe = Pick<AppSystemMenu, 'name'> & Pick<AppSystemMenuMeta, 'cache' | 'url'>

  /**
   * App tab state
   */
  interface IAppStoreTab {
    tabs: AppTab[]
    iframeList: IAppTabIframe[]
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
    country_code: string
  }

  /**
   * User profile state
   */
  interface IUserStoreProfile {
    profile: Partial<AppSystemUser>
  }

  /**
   * User auth state
   */
  interface IUserStoreAuth {
    accessToken?: RemovableRef<string>
    refreshToken?: RemovableRef<string>
    remember?: RemovableRef<Omit<AppPayloadAuth.Password, 'rememberMe'>>
  }

  /**
   * User permission state
   */
  interface IUserStorePermission {
    permissions: string[]
  }

  interface IUserStoreScroll {
    scrollEntries: RemovableRef<[string, { top: number, left?: number }][]>
  }
}

export { }
