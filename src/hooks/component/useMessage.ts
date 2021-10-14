// import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { useDialog } from 'naive-ui'

export const useMessage = (opt) => {
  // return ElMessage(opt)
}

export const useMessageBox = (opt) => {
  // return ElMessageBox(opt)
}

export const useNotification = (opt) => {
  // return ElNotification(opt)
}

/**
 * @description operations to confirm weather to continue, like delete or other important operations
 */
export const useContinue = (msg: string) => {
  const { t } = useAppI18n()
  const dialog = useDialog()

  const goNext = () => {
    return new Promise((res) => {
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
  }

  return {
    goNext,
  }
}
