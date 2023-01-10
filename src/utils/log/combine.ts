import { getNow } from 'easy-fns-ts'

const { name } = __APP_INFO__

export const AppLog = (msg: string | unknown) => {
  console.log(`[${name}] [${getNow()}]`, msg)
}

export const AppInfo = (msg: string | unknown) => {
  console.info(`[${name}] [${getNow()}]`, msg)
}

export const AppWarn = (msg: string | unknown) => {
  console.warn(`[${name}] [${getNow()}]`, msg)
}

export const AppError = (msg: string | unknown) => {
  console.error(`[${name}] [${getNow()}]`, msg)
}
