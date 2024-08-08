import type { WForm } from '../types'

export function useFormMethods(formRef: Ref<Nullable<WForm.Inst.NFormInst>>) {
  const methods = {
    validate: (fields?: string[]) => {
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
            rule => fields?.includes(rule?.key as string),
          )
        })
      }
    },
    restoreValidation: () => formRef.value?.restoreValidation(),
  }

  return { methods }
}
