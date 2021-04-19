export interface AppContext {
  /**
   * @description Is in dark mode
   */
  isDark: boolean

  /**
   * @description Dark mode type
   */
  darkMode: AppDarkModeType

  /**
   * @description Test
   */
  arr: { value: number; name: string }[]

  locale: AppLocaleType
}

export type AppLocaleType = 'en' | 'zh_CN'

export type AppDarkModeType = 'light' | 'dark' | 'system'
