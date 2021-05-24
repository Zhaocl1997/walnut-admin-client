import type { WForm } from '../types'
import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

type useFormRegisterFn = (instance: WForm.Methods) => void

type useFormReturnType = [useFormRegisterFn, WForm.ElForm.Methods]

export const useForm = (props: WForm.Props): useFormReturnType => {
  isInSetup()

  const wFormRef = ref<Nullable<WForm.Methods>>(null)

  const register = (instance: WForm.Methods): void => {
    wFormRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: WForm.ElForm.Methods = {
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
