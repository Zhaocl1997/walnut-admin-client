import { getNow } from 'easy-fns-ts'
import { terminal } from 'virtual:terminal'
import { appName } from '../constant/prefix'

export const AppTerminalLog = (msg: string | unknown) =>
  terminal.log(`${appName} [${getNow()}] ` + msg)

export const AppTerminalInfo = (msg: string | unknown) =>
  terminal.info(`${appName} [${getNow()}] ` + msg)

export const AppTerminalWarn = (msg: string | unknown) =>
  terminal.warn(`${appName} [${getNow()}] ` + msg)

export const AppTerminalError = (msg: string | unknown) =>
  terminal.error(`${appName} [${getNow()}] ` + msg)
