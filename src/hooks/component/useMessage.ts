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
export const useContinue = (msg: string) => {
  const { t } = useAppI18n()
  const dialog = useAppDialog()

  const goNext = () =>
    new Promise((res) => {
      dialog.warning({
        title: t('component.base.message.warning'),
        content: msg,
        negativeText: t('component.base.action.cancel'),
        positiveText: t('component.base.action.confirm'),
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
