import { getNow } from 'easy-fns-ts'
import { appName } from '../constant/prefix'

export const AppLog = (msg: string | unknown) => {
  console.log(`${appName} [${getNow()}]`, msg)
}

export const AppInfo = (msg: string | unknown) => {
  console.log(`${appName} [${getNow()}]`, msg)
}

export const AppWarn = (msg: string | unknown) => {
  console.log(`${appName} [${getNow()}]`, msg)
}

export const AppError = (msg: string | unknown) => {
  console.log(`${appName} [${getNow()}]`, msg)
}
