import type { WButtonGroup } from '../../../ButtonGroup'
import type { WTableEditableColumnProps } from './tableHeadersItemEditable'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps {
  key: string
  type: 'index' | 'selection' | 'expand' | 'action' | 'editable'
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
  EmptyObject
>

/**
 * @description Action column render way
 */
export type WTableActionType = 'array' | 'slot'

/**
 * @description Action column array button group config
 */
export type WTableActionConfig = 'create' | 'edit' | 'delete'

/**
 * @description Action column type
 * @extends
 */
export type WTableEditableColumnDefaultAction = WTableEditableColumnDefaultCustomType<
  'action',
  {
    actionType: WTableActionType
    buttonGroup: WButtonGroup
    actionConfig: WTableActionConfig[]
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
