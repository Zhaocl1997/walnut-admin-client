export const AppConstPersistKey = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REMEMBER: 'REMEMBER',

  DARK_MODE: 'DARK_MODE',
  IS_DARK: 'IS_DARK',

  LOCK_MODE: 'LOCK_MODE',
  IS_LOCK: 'IS_LOCK',
  LOCK_ROUTE: 'LOCK_ROUTE',

  LOCALE: 'LOCALE',

  TABS: 'TABS',
} as const

export const AppConstStorageType = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIES: 'cookies',
} as const

export type ValueOfAppConstPersistKey = ValueOf<typeof AppConstPersistKey>
export type ValueOfAppConstStorageType = ValueOf<typeof AppConstStorageType>
