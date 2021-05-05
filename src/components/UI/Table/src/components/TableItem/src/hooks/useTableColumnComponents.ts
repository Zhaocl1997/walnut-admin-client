import { getCurrentInstance } from 'vue'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useTableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableColumnIndex: createAsyncComponent(
      () => import('../components/base/index.vue')
    ),
    WTableColumnSelect: createAsyncComponent(
      () => import('../components/base/select.vue')
    ),
    WTableColumnExpand: createAsyncComponent(
      () => import('../components/base/expand.vue')
    ),
    WTableColumnAction: createAsyncComponent(
      () => import('../components/base/action.vue')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
