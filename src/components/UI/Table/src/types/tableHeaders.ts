import type {
  ElTableColumnProps,
  WTableEditableColumnDefaultIndex,
  WTableEditableColumnDefaultSelect,
  WTableEditableColumnDefaultExpand,
  WTableEditableColumnDefaultAction,
  WTableEditableColumn,
} from './tableHeadersItem'
import type { MaybeRef } from '/~/utils'

/**
 * @description some shared props
 */
interface SharedColumnProps {
  /**
   * @description column visible
   */
  visible: MaybeRef<boolean>

  /**
   * @description nested columns
   */
  children: WTableHeaderItem[]
}

/**
 * @description extend from `ElTable-column` props
 */
export type WTableHeaderItem = Partial<
  (
    | ElTableColumnProps
    | (
        | WTableEditableColumnDefaultIndex
        | WTableEditableColumnDefaultSelect
        | WTableEditableColumnDefaultExpand
        | WTableEditableColumnDefaultAction
        | WTableEditableColumn
      )
  ) &
    SharedColumnProps
>
