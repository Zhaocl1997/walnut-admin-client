import type { Nullable } from 'easy-fns-ts'
import { isProd } from '../constant/vue'
import { Cookie } from './src/Cookie'

const AppCookie = new Cookie({
  encrypt: isProd(),
})

/* cookie */
export function setCookie(key: string, value: any, expire?: number) {
  AppCookie.set(key, value, expire)
}

export function getCookie(key: string): Nullable<any> {
  return AppCookie.get(key)
}

export function clearCookie() {
  AppCookie.clear()
}

export function removeCookie(key: string) {
  AppCookie.remove(key)
}
