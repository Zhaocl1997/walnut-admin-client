import type { WForm } from '../types'

export function useFormMethods<T>(formRef: Ref<WForm.Inst.NFormInst>) {
  function validate(fields?: (keyof T)[]) {
    if (!fields || fields.length === 0) {
      return new Promise<boolean>((resolve) => {
        formRef.value?.validate((err) => {
          resolve(!err)
        })
      })
    }
    else {
      return new Promise<boolean>((resolve) => {
        formRef.value?.validate(
          (err) => {
            resolve(!err)
          },
          rule => fields?.includes(rule?.key as keyof T),
        )
      })
    }
  }

  function restoreValidation() {
    formRef.value?.restoreValidation()
  }

  return {
    validate,
    restoreValidation,
  }
}

export type ICompUIFormHooksMethods<T> = ReturnType<typeof useFormMethods<T>>
