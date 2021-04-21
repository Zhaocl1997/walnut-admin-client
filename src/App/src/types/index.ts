import type { Menu } from '/@/router/types'
import type { UserInfoType } from '/@/store/types/user'

export interface AppContext {
  // App Relative
  app: {
    /**
     * @description App Is Dark, just a symbol for icon display
     */
    isDark: boolean

    /**
     * @description App Dark Mode
     */
    darkMode: AppDarkModeType

    /**
     * @description App Locale
     */
    locale: AppLocaleType

    /**
     * @description App Menu Collapse
     */
    collapse: boolean

    /**
     * @description App Device type
     */
    device: AppDevice

    /**
     * @description App Is Mobile
     */
    isMobile: boolean

    /**
     * @description App Show Aside
     */
    showAside: boolean
  }

  // Menu & Route Relative
  menu: {
    menus: Menu[]

    keepAliveRouteNames: string[]
  }

  // User Relative
  user: {
    token: string

    userInfo: Partial<UserInfoType>
  }
}

export type AppLocaleType = 'en' | 'zh_CN'

export type AppDarkModeType = 'light' | 'dark' | 'system'

export type AppDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop'
