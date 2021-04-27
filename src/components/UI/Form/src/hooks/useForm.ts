import type { WFormMethods, WFormProps, ElFormMethods } from '../types'
import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

type useFormRegisterFn = (instance: WFormMethods) => void

type useFormReturnType = [useFormRegisterFn, ElFormMethods]

export const useForm = (props: Partial<WFormProps>): useFormReturnType => {
  isInSetup()

  const wFormRef = ref<Nullable<WFormMethods>>(null)

  const register = (instance: WFormMethods): void => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: ElFormMethods = {
    validate: async () => {
      return await wFormRef.value!.validate()
    },

    validateField: async (props) => {
      return await wFormRef.value!.validateField(props)
    },

    clearValidate: async (props) => {
      return await wFormRef.value!.clearValidate(props)
    },

    resetFields: async () => {
      return await wFormRef.value!.resetFields()
    },
  }

  return [register, methods]
}
