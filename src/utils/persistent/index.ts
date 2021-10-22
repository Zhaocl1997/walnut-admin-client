import type { AppState, TabState } from '/@/App'

import { isProd } from '../constant/vue'
import { storagePrefix } from '../constant/prefix'
import { useAppStorage } from './src/Storage'
import { Cookie } from './src/Cookie'
import { authName } from '/@/router/constant'

const AppCookie = new Cookie({
  prefixKey: storagePrefix,
  encrypt: isProd(),
})

/* cookie */
export const setCookie = (key: string, value: any, expire?: number) => {
  AppCookie.set(key, value, expire)
}

export const getCookie = (key: string): Nullable<any> => {
  return AppCookie.get(key)
}

export const clearCookie = () => {
  AppCookie.clear()
}

export const removeCookie = (key: string) => {
  AppCookie.remove(key)
}

// entry for storage
export const STORAGE_AUTH = useAppStorage<{
  username?: string
  password?: string
}>(PersistentKeysConst.AUTH, {})

export const STORAGE_USER = useAppStorage(PersistentKeysConst.USER, {})

export const STORAGE_APP = useAppStorage<AppState>(PersistentKeysConst.APP, {
  isDark: false,
  darkMode: 'light',
  locale: 'zh_CN',
  collapse: false,
  device: 'desktop',
  isMobile: false,
  showAside: false,
})

export const STORAGE_TOKEN = useAppStorage<string>(
  PersistentKeysConst.TOKEN,
  ''
)

export const STORAGE_TAB = useAppStorage<TabState>(PersistentKeysConst.TAB, {
  tabs: [],
  targetTabName: '',
})

export const STORAGE_MENU = useAppStorage(PersistentKeysConst.MENU, {
  indexMenuName: authName,
})

export { useAppStorage }
