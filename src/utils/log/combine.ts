import { getNow } from 'easy-fns-ts'

const { name } = __APP_INFO__

const upperName = name.toUpperCase()

export function AppConsoleLog(module: string, msg: string | unknown) {
  // eslint-disable-next-line no-console
  console.log(`%c[${upperName}][${getNow()}][${module}]\n${msg}`, 'color: #63e2b7; font-weight: bold; font-size: 16px')
}

export function AppConsoleInfo(module: string, msg: string | unknown) {
  // eslint-disable-next-line no-console
  console.info(`%c[${upperName}][${getNow()}][${module}]\n${msg}`, 'color: #63e2b7; font-weight: bold; font-size: 16px')
}

export function AppConsoleWarn(module: string, msg: string | unknown) {
  console.warn(`%c${upperName}][${getNow()}][${module}]\n${msg}`, 'color: #70c0e8; font-weight: bold; font-size: 16px')
}

export function AppConsoleErr(module: string, msg: string | unknown) {
  console.error(`%c[${upperName}][${getNow()}][${module}]\n${msg}`, 'color: #e88080; font-weight: bold; font-size: 16px')
}
