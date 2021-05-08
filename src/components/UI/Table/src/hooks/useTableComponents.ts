import { getCurrentInstance } from 'vue'

import WTableColumn from '../components/TableColumn'

export const useTableComponent = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableColumn,
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
