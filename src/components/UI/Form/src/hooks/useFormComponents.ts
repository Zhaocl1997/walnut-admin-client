import { getCurrentInstance } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'
import WFormItem from '../components/FormItem'

export const useFormComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WFormItem,
    WFormItemExtendDivider: createAsyncComponent(
      () => import('../components/Extend/Divider.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
