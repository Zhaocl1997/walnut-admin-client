import type { WButtonGroupItem } from '../../../ButtonGroup'
import type { WTableHeaderItemExtendActionProps } from './tableHeadersItemAction'
import type { WTableEditableColumnProps } from './tableHeadersItemEditable'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps {
  key: string
  type: 'index' | 'selection' | 'expand'
  columnKey: string
  label: string
  prop: string
  width: string
  minWidth: string
  fixed: boolean | 'left' | 'right'
  renderHeader: Fn
  sortable: boolean | 'custom'
  sortMethod: Fn
  sortBy: string | any[] | Fn
  sortOrders: ['ascending', 'descending', null]
  resizable: boolean
  formatter: Fn
  showOverflowTooltip: boolean
  align: 'left' | 'center' | 'right'
  headerAlign: 'left' | 'center' | 'right'
  className: string
  labelClassName: string

  filters: { text: string; value: string }[]
  filterPlacement: string
  filterMultiple: boolean
  filterMethod: Fn
  filteredValue: any[]
}

/**
 * @description Override origin column `type` field
 */
export type WTableEditableColumnDefaultCustomType<T, K> = K &
  ElTableColumnProps & {
    /**
     * @description custom column type
     */
    type: T
  }

/**
 * @description Index column type
 */
export type WTableEditableColumnDefaultIndex = WTableEditableColumnDefaultCustomType<
  'index',
  {
    index: number | ((index: number) => number)
  }
>

/**
 * @description Selection column type
 */
export type WTableEditableColumnDefaultSelect = WTableEditableColumnDefaultCustomType<
  'selection',
  {
    selectable: (row: Recordable, index: number) => boolean
    reserveSelection: boolean
  }
>

/**
 * @description Expand column type
 */
export type WTableEditableColumnDefaultExpand = WTableEditableColumnDefaultCustomType<
  'expand',
  {}
>

type WTableHeaderItemBaseColumnProps =
  | WTableEditableColumnDefaultIndex
  | WTableEditableColumnDefaultSelect
  | WTableEditableColumnDefaultExpand

/**
 * @description Action column render way
 */
export type WTableEditableColumnActionType = 'array' | 'slot'

/**
 * @description Action column array button group config
 */
export type WTableEditableColumnActionConfig = 'create' | 'edit' | 'delete'

/**
 * @description Action column custom array to render button group
 */
export type WTableEditableColumnActionButtonGroup = (WButtonGroupItem & {
  actionButtonType?: WTableEditableColumnActionConfig
})[]

/**
 * @description Action column type
 * @extends
 */
export type WTableEditableColumnDefaultAction = WTableEditableColumnDefaultCustomType<
  'action',
  {
    actionType: WTableEditableColumnActionType
    actionConfig: WTableEditableColumnActionConfig[]
    actionButtonGroup: WTableEditableColumnActionButtonGroup
  }
>

/**
 * @description Used for editable columns
 * @extends
 */
export type WTableEditableColumn = WTableEditableColumnDefaultCustomType<
  'editable',
  WTableEditableColumnProps
>

////////////////////////////////////////////////////////////////////////////

type WTableHeaderItemBase<T, P> = {
  /**
   * @description generaic type
   */
  type?: T

  /**
   * @description column visibility
   */
  visible?: boolean

  /**
   * @description Original el-table-column props, support different type different props.
   * Only specific `type` column have its own types. Same structure for action and editable column.
   * @example type: 'index' => componentProps: { index: () => {} }
   * @example type: 'selection' => componentProps: { selectable: () => {} }
   * @example type: 'expand' => componentProps: {  }
   */
  columnProps?: Partial<WTableHeaderItemBaseColumnProps>

  /**
   * @description Custom props for different type
   */
  componentProps?: Partial<P>
}

/**
 * @description Default table column types, support for tree data structure
 */
type WTableHeaderItemBaseDefault = TreeDataItem<
  WTableHeaderItemBase<'default', {}>
>

/**
 * @description Action table column types
 */
type WTableHeaderItemExtendAction = WTableHeaderItemBase<
  'action',
  WTableHeaderItemExtendActionProps
>

/**
 * @description Editable table column types
 */
type WTableHeaderItemExtendEditable = WTableHeaderItemBase<
  'editable',
  WTableEditableColumnProps
>

/**
 * @description w-table header item typing
 */
export type WTableHeaderItemNew =
  | WTableHeaderItemBaseDefault
  | WTableHeaderItemExtendAction
  | WTableHeaderItemExtendEditable
