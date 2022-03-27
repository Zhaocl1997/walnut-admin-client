export const PersistentKeysConst = {
  AUTH: 'AUTH',
  APP: 'APP',
  TOKEN: 'TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  LOCK: 'LOCK',
} as const

export const StorageTypeConst = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIES: 'cookies',
} as const

export type ValueOfPersistentKeysConst = ValueOf<typeof PersistentKeysConst>
export type ValueOfStorageTypeConst = ValueOf<typeof StorageTypeConst>
