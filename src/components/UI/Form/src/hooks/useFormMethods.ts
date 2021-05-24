import type { WForm } from '../types'
import type { Ref } from 'vue'

export const useFormMethods = (
  formRef: Ref<Nullable<WForm.ElForm.Methods>>,
  customMethods: any
) => {
  const formMethods: WForm.Methods = {
    ...customMethods,

    validate: () => {
      return new Promise((res) => {
        formRef
          .value!.validate()
          .then(() => {
            res(true)
          })
          .catch((err) => {
            res(false)
          })
      })
    },

    validateField: (props) => {
      return new Promise((res) => {
        formRef.value!.validateField(props, (msg) => {
          msg ? res(false) : res(true)
        })
      })
    },

    clearValidate: async (props) => {
      return await formRef.value!.clearValidate(props)
    },

    resetFields: async () => {
      return await formRef.value!.resetFields()
    },
  }

  return {
    formMethods,
  }
}
