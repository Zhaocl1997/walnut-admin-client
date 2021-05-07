import { getCurrentInstance } from 'vue'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useTableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableColumnIndex: createAsyncComponent(
      () => import('../components/base/index.vue')
    ),
    WTableColumnSelection: createAsyncComponent(
      () => import('../components/base/selection.vue')
    ),
    WTableColumnExpand: createAsyncComponent(
      () => import('../components/base/expand.vue')
    ),

    // extension
    WTableColumnAction: createAsyncComponent(
      () => import('../components/base/action.vue')
    ),

    // extension
    WTableColumnEditable: createAsyncComponent(
      () => import('../components/expand/editable/editable.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
