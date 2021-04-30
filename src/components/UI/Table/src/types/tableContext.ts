import type { ComputedRef } from '@vue/reactivity'
import type { WTableProps } from './tableProps'

/**
 * @description WForm context type definition
 */
export interface WTableContext {
  tableProps: ComputedRef<WTableProps>
}
