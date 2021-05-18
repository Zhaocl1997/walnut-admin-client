import type { WTable } from '../types'
import { tableKey } from '../utils'
import { useContext } from '/@/hooks/core/useContext'

export const {
  setContext: setTableContext,
  getContext: useTableContext,
} = useContext<WTable.Context>(tableKey)
