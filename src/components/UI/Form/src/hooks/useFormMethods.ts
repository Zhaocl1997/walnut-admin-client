import type { WForm } from '../types'

export function useFormMethods<T>(formRef: Ref<WForm.Inst.NFormInst>, dialogRef: Ref<WForm.Inst.DialogInst>) {
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
    onOpen: async (beforeHook: (done: Fn) => void) => {
      await dialogRef.value?.onOpen(beforeHook)
    },
    onClose: () => {
      dialogRef.value?.onClose()
    },
  }
}

export type ICompUIFormHooksMethods<T> = ReturnType<typeof useFormMethods<T>>
