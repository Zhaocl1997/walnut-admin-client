import type { WForm } from '../types'
import type { ICompUIFormHooksMethods } from './useFormMethods'

export function useForm<T>(props: IDeepMaybeRef<WForm.Props<T>> | WForm.Props<T>): WForm.Hook.useFormReturnType<T> {
  isInSetup()

  const wFormRef = ref<WForm.Inst.WFormInst<T>>()

  const register = (instance: WForm.Inst.WFormInst<T>) => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props as WForm.Props<T>)
    })
  }

  const methods: ICompUIFormHooksMethods<T> = {
    validate: async (fields?: (keyof T)[]) => await (wFormRef.value?.validate(fields) ?? Promise.resolve(false)),
    restoreValidation: () => wFormRef.value?.restoreValidation(),
    onOpen: (beforeHook?: Fn) => wFormRef.value?.onOpen(beforeHook),
    onClose: () => wFormRef.value?.onClose(),
  }

  return [register, methods]
}
