import type { WFormMethods, WFormProps, ElFormMethods } from '../types'
import { ref, unref, nextTick, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'
import { appError } from '/@/utils/log'

type useFormRegisterFn = (instance: WFormMethods) => void

type useFormReturnType = [useFormRegisterFn, ElFormMethods]

export const useForm = (props: Partial<WFormProps>): useFormReturnType => {
  isInSetup()

  const formRef = ref<Nullable<any>>(null)

  const getInstance = async (): Promise<WFormMethods> => {
    const instance: WFormMethods = unref(formRef)!
    if (!instance) {
      appError('Form instance is undefined!')
    }
    await nextTick()
    return instance
  }

  const register = (instance: WFormMethods): void => {
    formRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: ElFormMethods = {
    validate: async () => {
      return await (await getInstance()).validate()
    },

    validateField: async (props) => {
      return await (await getInstance()).validateField(props)
    },

    clearValidate: async (props) => {
      return await (await getInstance()).clearValidate(props)
    },

    resetFields: async () => {
      return await (await getInstance()).resetFields()
    },
  }

  return [register, methods]
}
