import type { ElFormMethods, WFormMethods } from './../types/formMethods'
import type { Ref } from 'vue'

export const useFormMethods = (
  formRef: Ref<Nullable<ElFormMethods>>,
  customMethods: any
) => {
  const formMethods: WFormMethods = {
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
