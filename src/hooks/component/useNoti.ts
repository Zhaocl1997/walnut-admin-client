import type { NotificationType } from 'naive-ui'
import { formatTime } from 'easy-fns-ts'

export const useAppNotification = () => {
  return window.$notification
}

interface AppNotiOptions {
  type?: NotificationType
  duration?: number
  closable?: boolean
  placement?: NotificationPlacement
}

/**
 * @description notification usage
 */
export const AppNoti = (msg: string, options: AppNotiOptions) => {
  const appMsg = useAppStoreNaive()

  appMsg.setNotiPlacement(options?.placement ?? 'top-right')

  useAppNotification().create({
    title: import.meta.env.VITE_APP_TITLE,
    content: msg,
    duration: options?.duration ?? 5000,
    closable: options?.closable ?? true,
    meta: formatTime(new Date()),
    type: options.type,
  })
}

export const useAppNotiSuccess = (
  msg: string,
  options?: Omit<AppNotiOptions, 'type'>
) => AppNoti(msg, { ...options, type: 'success' })

export const useAppNotiInfo = (
  msg: string,
  options?: Omit<AppNotiOptions, 'type'>
) => AppNoti(msg, { ...options, type: 'info' })

export const useAppNotiWarning = (
  msg: string,
  options?: Omit<AppNotiOptions, 'type'>
) => AppNoti(msg, { ...options, type: 'warning' })

export const useAppNotiError = (
  msg: string,
  options?: Omit<AppNotiOptions, 'type'>
) => AppNoti(msg, { ...options, type: 'error' })
