import type { WTableContext } from '../types'
import { tableKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

export const {
  setContext: setTableContext,
  getContext: useTableContext,
} = useContext<WTableContext>(tableKey)
