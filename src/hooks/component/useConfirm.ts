import type { DialogOptions } from 'naive-ui'

export const useAppDialog = () => {
  return window.$dialog
}

/**
 * @description some cases need to ask for user confirm to continue next action
 */
export const useAppConfirm = (msg: string, options?: DialogOptions) => {
  const dialog = useAppDialog()

  return new Promise<boolean>((res) => {
    dialog.warning({
      title: AppI18n.global?.t('app.base.warning'),
      content: msg,
      negativeText: AppI18n.global?.t('app.button.no'),
      positiveText: AppI18n.global?.t('app.button.yes'),
      autoFocus: false,
      ...options,
      onPositiveClick: () => {
        res(true)
      },
      onNegativeClick: () => {
        res(false)
      },
    })
  })
}
