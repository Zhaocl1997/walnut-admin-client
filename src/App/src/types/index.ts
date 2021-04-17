export interface AppContext {
  /**
   * @description Is in dark mode
   */
  isDark: boolean

  /**
   * @description Dark mode type
   */
  darkMode: 'light' | 'dark' | 'system'

  /**
   * @description Test
   */
  arr: { value: number; name: string }[]
}
