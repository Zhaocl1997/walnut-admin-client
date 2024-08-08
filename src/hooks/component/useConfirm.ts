import type { DialogOptions } from 'naive-ui'

export function useAppDialog() {
  return window.$dialog
}

/**
 * @description some cases need to ask for user confirm to continue next action
 */
export function useAppConfirm(msg: string, options?: DialogOptions) {
  const dialog = useAppDialog()

  return new Promise<boolean>((resolve) => {
    dialog.warning({
      title: AppI18n.global?.t('app.base.warning'),
      content: msg,
      negativeText: AppI18n.global?.t('app.button.no'),
      positiveText: AppI18n.global?.t('app.button.yes'),
      autoFocus: false,
      ...options,
      onPositiveClick: () => {
        resolve(true)
      },
      onNegativeClick: () => {
        resolve(false)
      },
    })
  })
}
