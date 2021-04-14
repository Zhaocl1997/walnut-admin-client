import type {
  useDialogReturnType,
  WDialogMethods,
  WDialogProps,
} from '../types'
import { ref, unref, nextTick, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'
import { appError } from '/@/utils/log'

export const useDialog = (props?: WDialogProps): useDialogReturnType => {
  isInSetup()

  const dialogRef = ref<Nullable<any>>(null)

  const getInstance = async (): Promise<WDialogMethods> => {
    const instance: WDialogMethods = unref(dialogRef)!
    if (!instance) {
      appError('Dialog instance is undefined!')
    }
    await nextTick()
    return instance
  }

  const register = (instance: WDialogMethods): void => {
    dialogRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    openDialog: async (props: WDialogProps) => {
      ;(await getInstance()).openDialog(props)
    },

    closeDialog: async () => {
      ;(await getInstance()).closeDialog()
    },
  }

  return [register, methods]
}
