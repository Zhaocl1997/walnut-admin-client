import type { MessageType } from 'naive-ui'

export const useAppMessage = () => {
  return window.$message
}

interface AppMessageOptions {
  type?: MessageType
  duration?: number
  closable?: boolean
  placement?: MessagePlacement
}

/**
 * @description message usage
 */
export const AppMsg = (msg: string, options: AppMessageOptions) => {
  const appMsg = useAppStoreNaive()

  appMsg.setMsgPlacement(options?.placement ?? 'top')

  useAppMessage().create(msg, {
    duration: options?.duration ?? 3000,
    closable: options?.closable ?? true,
    type: options.type,
  })
}

export const useAppMsgSuccess = (
  msg?: string,
  options?: Omit<AppMessageOptions, 'type'>
) =>
  AppMsg(msg ?? AppI18n.global?.t('app.base.operation.success'), {
    ...options,
    type: 'success',
  })

export const useAppMsgInfo = (
  msg: string,
  options?: Omit<AppMessageOptions, 'type'>
) => AppMsg(msg, { ...options, type: 'info' })

export const useAppMsgWarning = (
  msg: string,
  options?: Omit<AppMessageOptions, 'type'>
) => AppMsg(msg, { ...options, type: 'warning' })

export const useAppMsgError = (
  msg: string,
  options?: Omit<AppMessageOptions, 'type'>
) => AppMsg(msg, { ...options, type: 'error' })
