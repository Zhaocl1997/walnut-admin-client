import type { ValueOf } from 'easy-fns-ts'

export const AppConstPersistKey = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REMEMBER: 'REMEMBER',

  DARK_MODE: 'DARK_MODE',

  LOCK_MODE: 'LOCK_MODE',
  IS_LOCK: 'IS_LOCK',
  LOCK_ROUTE: 'LOCK_ROUTE',

  LOCALE: 'LOCALE',

  TABS: 'TABS',

  SCROLL: 'SCROLL',

  // finger print
  FP_ID: 'FPID',

  // geo ip info, fetch from EXTERNAL_LINKS.GEOIP
  GEO_IP_INFO: 'GEO_IP_INFO',

  // button retry keep after refresh map
  BUTTON_RETRY: 'BUTTON_RETRY_MAP',
} as const

export const AppConstStorageType = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIES: 'cookies',
} as const

export type ValueOfAppConstPersistKey = ValueOf<typeof AppConstPersistKey>
export type ValueOfAppConstStorageType = ValueOf<typeof AppConstStorageType>
