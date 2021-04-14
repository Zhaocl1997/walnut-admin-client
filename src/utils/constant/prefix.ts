import pkg from '../../../package.json'
import { mode } from './vue'

export const appName = pkg.name.toLocaleUpperCase()
export const appVersion = pkg.version

export const appPrefix = `${appName.replace(
  '-',
  '__'
)}__${appVersion}__${mode()}`
export const localStorageBasePrefix = `LOCAL`
export const sessionStorageBasePrefix = `SESSION`
export const cookieBasePrefix = `COOKIE`
export const basePrefix = appName.slice(0, 1)

export const getLocalStoragePrefix = () => {
  return `__${appPrefix}__${localStorageBasePrefix}`
}

export const getSessionStoragePrefix = () => {
  return `__${appPrefix}__${sessionStorageBasePrefix}`
}

export const getCookiePrefix = () => {
  return `__${appPrefix}__${cookieBasePrefix}`
}
