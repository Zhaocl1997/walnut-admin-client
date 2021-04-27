import type { ElFormMethods, WFormMethods } from './../types/formMethods'
import type { Ref } from 'vue'

export const useFormMethods = (
  formRef: Ref<Nullable<ElFormMethods>>,
  customMethods: any
) => {
  const formMethods: WFormMethods = {
    ...customMethods,

    validate: async () => {
      return await formRef.value!.validate()
    },

    validateField: async (props) => {
      return await formRef.value!.validateField(props)
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
