import { getCurrentInstance } from 'vue'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useTableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    // original
    WTableColumnDefaultIndex: createAsyncComponent(
      () => import('../components/default/index.vue')
    ),
    WTableColumnDefaultSelection: createAsyncComponent(
      () => import('../components/default/selection.vue')
    ),
    WTableColumnDefaultExpand: createAsyncComponent(
      () => import('../components/default/expand.vue')
    ),

    // extend
    WTableColumnExtendAction: createAsyncComponent(
      () => import('../components/extend/action/action.vue')
    ),
    WTableColumnExtendEditable: createAsyncComponent(
      () => import('../components/extend/editable/editable.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
