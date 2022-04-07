import { getNow } from 'easy-fns-ts'
import { appName } from '../constant/prefix'

export const AppTerminalLog = (msg: string | unknown) =>
  console.log(`${appName} [${getNow()}] ` + msg)

export const AppTerminalInfo = (msg: string | unknown) =>
  console.info(`${appName} [${getNow()}] ` + msg)

export const AppTerminalWarn = (msg: string | unknown) =>
  console.warn(`${appName} [${getNow()}] ` + msg)

export const AppTerminalError = (msg: string | unknown) =>
  console.error(`${appName} [${getNow()}] ` + msg)
