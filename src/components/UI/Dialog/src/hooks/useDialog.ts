import type {
  useDialogReturnType,
  WDialogMethods,
  WDialogProps,
} from '../types'
import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

export const useDialog = (props?: WDialogProps): useDialogReturnType => {
  isInSetup()

  const dialogRef = ref<Nullable<WDialogMethods>>(null)

  const register = (instance: WDialogMethods): void => {
    dialogRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    openDialog: async (props: WDialogProps) => {
      dialogRef.value!.openDialog(props)
    },

    closeDialog: async () => {
      dialogRef.value!.closeDialog()
    },
  }

  return [register, methods]
}
