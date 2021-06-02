import { getCurrentInstance } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useFormItemComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WFormItemTransition: createAsyncComponent(
      () => import('../../../../../../../Help/Transition')
    ),
    WFormItemExtendDivider: createAsyncComponent(
      () => import('../../../Extend/Divider.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
