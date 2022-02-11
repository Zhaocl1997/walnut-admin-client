import { capsuleLog, getNow } from 'easy-fns-ts'
import { appName } from '../constant/prefix'

export const AppBrowserLog = (msg: string | unknown) => {
  capsuleLog({
    title: `${appName} [${getNow()}]`,
    info: msg as string,
    type: 'success',
  })
}

export const AppBrowserInfo = (msg: string | unknown) => {
  capsuleLog({
    title: `${appName} [${getNow()}]`,
    info: msg as string,
    type: 'info',
  })
}

export const AppBrowserWarn = (msg: string | unknown) => {
  capsuleLog({
    title: `${appName} [${getNow()}]`,
    info: msg as string,
    type: 'warning',
  })
}

export const AppBrowserError = (msg: string | unknown) => {
  capsuleLog({
    title: `${appName} [${getNow()}]`,
    info: msg as string,
    type: 'danger',
  })
}
