import { getCurrentInstance } from 'vue'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useTableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableColumnIndex: createAsyncComponent(
      () => import('../components/default/index.vue')
    ),
    WTableColumnSelection: createAsyncComponent(
      () => import('../components/default/selection.vue')
    ),
    WTableColumnExpand: createAsyncComponent(
      () => import('../components/default/expand.vue')
    ),

    // extension
    WTableColumnAction: createAsyncComponent(
      () => import('../components/extend/action/action.vue')
    ),

    // extension
    WTableColumnEditable: createAsyncComponent(
      () => import('../components/extend/editable/editable.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
