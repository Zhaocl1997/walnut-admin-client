export const PersistentKeysConst = {
  AUTH: 'AUTH',
  USER: 'USER',
  APP: 'APP',
  TOKEN: 'TOKEN',
  TAB: 'TAB',
  MENU: ' MENU',
} as const

export const StorageTypeConst = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIES: 'cookies',
} as const

export type ValueOfPersistentKeysConst = ValueOf<typeof PersistentKeysConst>
export type ValueOfStorageTypeConst = ValueOf<typeof StorageTypeConst>
