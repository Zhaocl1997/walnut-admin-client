import { getCurrentInstance } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

import WFormItemTransition from '/@/components/Help/Transition'

export const useFormItemComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WFormItemTransition,
    WFormItemExtendDivider: createAsyncComponent(
      () => import('../../../Extend/Divider.vue')
    ),
    WFormItemExtendMultiple: createAsyncComponent(
      () => import('../../../Extend/Multiple.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
