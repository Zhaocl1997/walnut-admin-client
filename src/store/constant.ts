export const StoreKeys = {
  APP_ADAPTER: 'APP_ADAPTER',
  APP_DARK: 'APP_DARK',
  APP_KEY: 'APP_KEY',
  APP_LOCALE: 'APP_LOCALE',
  APP_LOCK: 'APP_LOCK',
  APP_MENU: 'APP_MENU',
  APP_MSG: 'APP_MSG',
  APP_SETTING_BACKEND: 'APP_SETTING_BACKEND',
  APP_SETTING: 'APP_SETTING',
  APP_TAB: 'APP_TAB',
  APP_CACHED_VIEWS: 'APP_CACHED_VIEWS',

  USER_PROFILE: 'USER_PROFILE',
  USER_AUTH: 'USER_AUTH',
  USER_PERMISSION: 'USER_PERMISSION',
  USER_SCROLL: 'USER_SCROLL',
} as const

/**
 * @description route name list that should not appear in tabs
 */
export const tabBlackListName: string[] = [
  AppAuthName,
  App404Name,
  App500Name,
  AppRedirectName,
]
