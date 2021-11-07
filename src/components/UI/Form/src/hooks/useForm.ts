import type { WForm } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useForm = <T>(
  props: DeepMaybeRefSelf<WForm.Props<T>>
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
    validate: () => wFormRef.value?.validate(),
    restoreValidation: () => wFormRef.value?.restoreValidation(),
    onOpen: () => wFormRef.value?.onOpen(),
  }

  return [register, methods]
}
