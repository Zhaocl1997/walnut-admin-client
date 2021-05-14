import { appName } from './constant/prefix'

export const appTable = (data: unknown[]) => {
  appInfo('Table Data')
  console.table(data)
}

export const appInfo = (msg: unknown) => {
  console.info(`[${appName}]`, msg)
}

export const appError = (msg: unknown) => {
  console.error(`[${appName}]`, msg)
}

export const appWarning = (scope: string, msg: string) => {
  console.warn(`[${appName}]-[${scope}]`, msg)
}
