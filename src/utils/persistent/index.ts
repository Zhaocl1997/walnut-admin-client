import { isProd } from '../constant/vue'

import {
  getLocalStoragePrefix,
  getSessionStoragePrefix,
  getCookiePrefix,
} from '../constant/prefix'

import { Storage } from './src/Storage'
import { Cookie } from './src/Cookie'

const AppLocalStorage = new Storage({
  storage: localStorage,
  prefixKey: getLocalStoragePrefix(),
  encrypt: isProd(),
})

/* local */
export const setLocal = (key: string, value: any, expire?: number) => {
  AppLocalStorage.set(key, value, expire)
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

const AppSessionStorage = new Storage({
  storage: sessionStorage,
  prefixKey: getSessionStoragePrefix(),
  encrypt: isProd(),
})

/* session */
export const setSession = (key: string, value: any, expire?: number) => {
  AppSessionStorage.set(key, value, expire)
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

const AppCookie = new Cookie({
  prefixKey: getCookiePrefix(),
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
