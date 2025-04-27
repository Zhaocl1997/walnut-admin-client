import type { WForm } from '../types'
import type { ICompUIFormHooksMethods } from './useFormMethods'

export function useForm<T>(props: WForm.Props<T>): WForm.Hook.useFormReturnType<T> {
  isInSetup()

  const wFormRef = ref<WForm.Inst.WFormInst<T>>()

  const register = (instance: WForm.Inst.WFormInst<T>) => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: ICompUIFormHooksMethods<T> = {
    validate: async (fields?: (keyof T)[]) => await (wFormRef.value?.validate(fields) ?? Promise.resolve(false)),
    restoreValidation: () => wFormRef.value?.restoreValidation(),
  }

  return [register, methods]
}
