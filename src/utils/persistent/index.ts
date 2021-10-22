import { isProd } from '../constant/vue'
import { storagePrefix } from '../constant/prefix'
import { useAppStorage } from './src/Storage'
import { Cookie } from './src/Cookie'

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

export { useAppStorage }
