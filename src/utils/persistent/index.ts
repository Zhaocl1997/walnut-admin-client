import { isProd } from './../constant/vue'
import {
  getLocalStoragePrefix,
  getSessionStoragePrefix,
  getCookiePrefix,
} from './../constant/prefix'
import { Storage, StorageOptions } from './src/Storage'
import { Cookie, CookieOptions } from './src/Cookie'

const createStorage = (opt: StorageOptions) => {
  return new Storage(opt)
}

const AppLocalStorage = createStorage({
  storage: localStorage,
  prefixKey: getLocalStoragePrefix(),
  encrypt: isProd(),
})

/* local */
export const setLocal = (key: string, value: any) => {
  AppLocalStorage.set(key, value)
}

export const getLocal = (key: string): Nullable<any> => {
  return AppLocalStorage.get(key)
}

export const clearLocal = () => {
  AppLocalStorage.clear()
}

export const removeLocal = (key: string) => {
  AppLocalStorage.remove(key)
}

const AppSessionStorage = createStorage({
  storage: sessionStorage,
  prefixKey: getSessionStoragePrefix(),
  encrypt: isProd(),
})

/* session */
export const setSession = (key: string, value: any) => {
  AppSessionStorage.set(key, value)
}

export const getSession = (key: string): Nullable<any> => {
  return AppSessionStorage.get(key)
}

export const clearSession = () => {
  AppSessionStorage.clear()
}

export const removeSession = (key: string) => {
  AppSessionStorage.remove(key)
}

const createCookie = (opt: CookieOptions) => {
  return new Cookie(opt)
}

const AppCookie = createCookie({
  prefixKey: getCookiePrefix(),
  encrypt: isProd(),
})

/* cookie */
export const setCookie = (key: string, value: any) => {
  AppCookie.set(key, value)
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
