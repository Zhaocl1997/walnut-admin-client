export interface AppContext {
  /**
   * @description Test
   */
  arr: { value: number; name: string }[]

  // App Relative
  app: {
    /**
     * @description App Is Dark
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
     * @description App Can show Aside
     * Duplicate to isMobile need to be removed
     */
    canShowAside: boolean

    /**
     * @description App Is Mobile
     */
    isMobile: boolean

    /**
     * @description App Show Aside
     */
    showAside: boolean
  }
}

export type AppLocaleType = 'en' | 'zh_CN'

export type AppDarkModeType = 'light' | 'dark' | 'system'

export type AppDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop'
