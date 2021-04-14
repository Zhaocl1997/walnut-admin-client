import { appName } from './constant/prefix'

export const appError = (msg: unknown) => {
  console.error(`[${appName}]`, msg)
}

export const appWarning = (msg: string) => {
  console.warn(`[${appName}]`, msg)
}
