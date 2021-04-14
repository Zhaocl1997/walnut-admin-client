import { getCurrentInstance } from 'vue'
import WFormItem from '../components/FormItem'

export const useFormComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WFormItem,
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
