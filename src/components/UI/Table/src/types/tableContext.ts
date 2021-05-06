import type { ComputedRef } from '@vue/reactivity'
import type { WTableProps } from './tableProps'
import type { ElTableColumnScopedSlot } from './tableSlot'

type WTableActionButtonType = 'create' | 'edit' | 'delete'

/**
 * @description WForm context type definition
 */
export interface WTableContext {
  tableProps: ComputedRef<WTableProps>

  emitEvents: {
    action: (
      type: WTableActionButtonType,
      scope: ElTableColumnScopedSlot
    ) => void
  }
}
