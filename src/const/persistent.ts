export const AppConstPersistKey = {
  AUTH: 'AUTH',
  APP: 'APP',
  TOKEN: 'TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',

  DARK_MODE: 'DARK_MODE',
  IS_DARK: 'IS_DARK',

  LOCK_MODE: 'LOCK_MODE',
  IS_LOCK: 'IS_LOCK',

  LOCALE: 'LOCALE',
} as const

export const AppConstStorageType = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIES: 'cookies',
} as const

export type ValueOfAppConstPersistKey = ValueOf<typeof AppConstPersistKey>
export type ValueOfAppConstStorageType = ValueOf<typeof AppConstStorageType>
