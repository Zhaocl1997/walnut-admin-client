import { getNow } from 'easy-fns-ts'

const { name } = __APP_INFO__

export function AppLog(msg: string | unknown) {
  console.log(`[${name}] [${getNow()}]`, msg)
}

export function AppInfo(msg: string | unknown) {
  console.info(`[${name}] [${getNow()}]`, msg)
}

export function AppWarn(msg: string | unknown) {
  console.warn(`[${name}] [${getNow()}]`, msg)
}

export function AppError(msg: string | unknown) {
  console.error(`[${name}] [${getNow()}]`, msg)
}
