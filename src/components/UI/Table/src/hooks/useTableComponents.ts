import { getCurrentInstance } from 'vue'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

import WTableColumn from '../components/TableColumn'

export const useTableComponent = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableColumn,
    WTableExtendSettings: createAsyncComponent(
      () => import('../components/Extend/settings')
    ),
    WTableExtendPagination: createAsyncComponent(
      () => import('../components/Extend/Pagination')
    ),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
