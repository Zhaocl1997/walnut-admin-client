import type { WForm } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useForm = <T>(
  props: DeepMaybeRefSelf<WForm.Props<T>> | WForm.Props<T>
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
    validate: (fields?: string[]) => wFormRef.value?.validate(fields),
    restoreValidation: () => wFormRef.value?.restoreValidation(),
    onOpen: (beforeHook?: Fn) => wFormRef.value?.onOpen(beforeHook)!,
  }

  return [register, methods]
}
