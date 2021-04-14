import { getCurrentInstance } from 'vue'

import WTableItem from '../components/TableItem'
import {
  WTableColumnIndex,
  WTableColumnSelect,
  WTableColumnExpand,
  WTableColumnAction,
} from '../components/Columns'

export const useTableComponent = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableItem,
    WTableColumnIndex,
    WTableColumnSelect,
    WTableColumnExpand,
    WTableColumnAction,
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
