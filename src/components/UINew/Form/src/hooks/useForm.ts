import type { WForm } from '../types'
import type { MaybeRefRecord } from '/~/utils'

import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

export const useForm = <T>(
  props: MaybeRefRecord<WForm.Props<T>>
): WForm.Hook.useFormReturnType => {
  isInSetup()

  const wFormRef = ref<Nullable<WForm.Inst.WFormInst>>(null)

  const register = (instance: WForm.Inst.WFormInst) => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    validate: async () => await wFormRef.value?.validate(),
    restoreValidation: () => wFormRef.value?.restoreValidation(),
    onOpen: () => wFormRef.value?.onOpen(),
    onClose: () => wFormRef.value?.onClose(),
    onYes: () => wFormRef.value?.onYes(),
  }

  return [register, methods]
}
