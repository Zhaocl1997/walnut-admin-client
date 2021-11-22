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
