import type { WForm } from '../types'

export const useFormMethods = (
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>
) => {
  const methods = {
    validate: (fields?: string[]) => {
      if (!fields || fields.length === 0) {
        return new Promise<boolean>((reslove) => {
          formRef.value?.validate((err) => {
            reslove(!err ? true : false)
          })
        })
      } else {
        return new Promise<boolean>((reslove) => {
          formRef.value?.validate(
            (err) => {
              reslove(!err ? true : false)
            },
            (rule) => fields?.includes(rule?.key as string)
          )
        })
      }
    },
    restoreValidation: () => formRef.value?.restoreValidation(),
  }

  return { methods }
}
