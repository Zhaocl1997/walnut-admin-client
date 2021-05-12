import type { ComputedRef, Ref } from '@vue/reactivity'
import type { WTableHeaderItem } from './tableHeaders'
import type { WTableProps } from './tableProps'
import type { ElTableColumnScopedSlot } from './tableSlot'

/**
 * @description w-table default action button type
 */
type WTableActionButtonType = 'create' | 'edit' | 'delete'

/**
 * @description refer to `edit` event params on `w-table`
 * 1. newValue: the new value user just edited
 * 2. row: refer to `ElTableColumnScopedSlot` row type
 * 3. prop: refer to `WTableHeaderItem` prop field
 * 4. loadStart: start the loading meanually
 * 5. loadEnd: end the loading meanually
 */
export interface WTableEditCellEmitParams {
  newValue: any
  row: any
  prop: string
  loadStart: Fn
  loadEnd: Fn
}

/**
 * @description WForm context type definition
 */
export interface WTableContext {
  /**
   * @description w-table props for `ComputedRef`
   */
  tableProps: ComputedRef<WTableProps>

  /**
   * @description w-table inside header context
   */
  tableHeaders: Ref<WTableHeaderItem[]>

  tableRef: Ref<any>

  tableId: string

  /**
   * @description w-table emit events
   * Provide these events on the top of the root vue file
   * And we can call it via context in children's components
   * Very convenient
   */
  emitEvents: {
    // type for action event
    action: (
      type: WTableActionButtonType,
      scope: ElTableColumnScopedSlot
    ) => void

    // type for edit event
    edit: (val: WTableEditCellEmitParams) => void
  }
}
