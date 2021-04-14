import type { ElFormMethods, WFormMethods } from './../types/formMethods'
import type { Ref } from 'vue'

export const useFormMethods = (
  formRef: Ref<ElFormMethods>,
  customMethods: any
) => {
  const formMethods: WFormMethods = {
    ...customMethods,

    validate: async () => {
      return await formRef.value.validate()
    },

    validateField: (props) => {
      return new Promise((resolve) => {
        formRef.value.validateField(props, (msg) => {
          resolve(msg)
        })
      })
    },

    clearValidate: (props) => {
      return formRef.value.clearValidate(props)
    },

    resetFields: () => {
      return formRef.value.resetFields()
    },
  }

  return {
    formMethods,
  }
}
