import type { WForm } from '../types'
import type { MaybeRefRecord } from '/~/utils'

import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

export const useForm = <T>(
  props: MaybeRefRecord<WForm.Props<T>>
): WForm.Hook.useFormReturnType => {
  isInSetup()

  const wFormRef = ref<Nullable<WForm.Ref.WFormRef>>(null)

  const register = (instance: WForm.Ref.WFormRef) => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    validate: async () => await wFormRef.value?.validate(),
    restoreValidation: async () => await wFormRef.value?.restoreValidation(),
  }

  return [register, methods]
}
