import type { NotificationOptions } from 'naive-ui'
import type { CSSProperties } from 'vue'
import { formatTime } from 'easy-fns-ts'

export function useAppNotification() {
  return window.$notification
}

interface AppNotiOptions extends NotificationOptions {
  placement?: NotificationPlacement
  containerStyle?: CSSProperties
}

/**
 * @description notification usage
 */
export function AppNoti(msg: string, options: AppNotiOptions) {
  const appNaive = useAppStoreNaive()
  const { title } = useAppEnvTitle()

  appNaive.setNotiPlacement(options?.placement ?? 'top-right')
  appNaive.setNotiContainerStyle(options?.containerStyle ?? {})

  const inst = useAppNotification()?.create({
    ...options,
    title: options.title ?? title,
    content: options.content ?? msg,
    duration: options?.duration ?? 5000,
    closable: options?.closable ?? true,
    meta: options.meta ?? formatTime(new Date()),
  })

  if (inst) {
    inst.onClose = () => {
      // recover the default placement and container style when current inst is closed
      appNaive.setNotiPlacement('top-right')
      appNaive.setNotiContainerStyle({})
    }
  }

  appNaive.setCurrentNotiInst(inst)
}

export function useAppNotiSuccess(msg: string, options?: Omit<AppNotiOptions, 'type'>) {
  return AppNoti(msg, { ...options, type: 'success' })
}

export function useAppNotiInfo(msg: string, options?: Omit<AppNotiOptions, 'type'>) {
  return AppNoti(msg, { ...options, type: 'info' })
}

export function useAppNotiWarning(msg: string, options?: Omit<AppNotiOptions, 'type'>) {
  return AppNoti(msg, { ...options, type: 'warning' })
}

export function useAppNotiError(msg: string, options?: Omit<AppNotiOptions, 'type'>) {
  return AppNoti(msg, { ...options, type: 'error' })
}
