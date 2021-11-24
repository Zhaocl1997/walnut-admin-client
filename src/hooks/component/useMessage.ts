import { formatTime } from 'easy-fns-ts'

export const useAppMessage = () => {
  return window.$message
}

export const useAppNotification = () => {
  return window.$notification
}

export const useAppDialog = () => {
  return window.$dialog
}

/**
 * @description Normal use 1, success message, with a default value
 */
export const useAppMsgSuccess = (title?: string) => {
  const { t } = useAppI18n()
  const AppSuccess = () => {
    useAppMessage().success(title ?? t('app:base:operation:success'))
  }
  return { AppSuccess }
}

/**
 * @description Normal use 2, error notification, with a default duration for 5s
 */
export const useAppNotiError = (msg: string, duration = 5000) => {
  useAppNotification().error({
    title: import.meta.env.VITE_APP_TITLE,
    content: msg,
    duration,
    meta: formatTime(new Date()),
  })
}

/**
 * @description operations to confirm to continue, like delete or other important operations
 */
export const useContinue = (msg: MaybeRefSelf<string> | Fn<any, string>) => {
  const { t } = useAppI18n()
  const dialog = useAppDialog()

  const goNext = () =>
    new Promise<boolean>((res) => {
      dialog.warning({
        title: t('app:base:warning'),
        content: msg as any,
        negativeText: t('app:button:no'),
        positiveText: t('app:button:yes'),
        onPositiveClick: () => {
          res(true)
        },
        onNegativeClick: () => {
          res(false)
        },
      })
    })

  return {
    goNext,
  }
}
