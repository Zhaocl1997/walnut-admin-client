import { unref } from 'vue'
import { formKey } from '../utils/InjectionKey'
import { useContext } from '../../../../../hooks/core/useContext'

export const useFormContext = () => {
  const { setContext, getContext } = useContext()

  const setFormContext = (value: any) => {
    setContext(formKey, value)
  }

  const getFormContext = () => {
    const formContext: any = getContext(formKey)
    return {
      ...unref(formContext),
    }
  }

  return {
    setFormContext,
    getFormContext,
  }
}
