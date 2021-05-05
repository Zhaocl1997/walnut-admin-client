import { getCurrentInstance } from 'vue'

import WTableItem from '../components/TableItem'

export const useTableComponent = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableItem,
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
