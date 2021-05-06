import type { WButtonGroup } from '../../../ButtonGroup'
import type { WSwitchProps } from '../../../Switch'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps {
  key: string

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
export type CustomTableColumn<T, K> = K &
  ElTableColumnProps & {
    /**
     * @description custom column type
     */
    type: T
  }

/**
 * @description Index column type
 */
export type IndexColumn = CustomTableColumn<
  'index',
  {
    index: number | ((index: number) => number)
  }
>

/**
 * @description Selection column type
 */
export type SelectColumn = CustomTableColumn<
  'selection',
  {
    selectable: (row: Recordable, index: number) => boolean
    reserveSelection: boolean
  }
>

/**
 * @description Expand column type
 */
export type ExpandColumn = CustomTableColumn<'expand', Record<string, unknown>>

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
 */
export type ActionColumn = CustomTableColumn<
  'action',
  {
    actionType: WTableActionType
    buttonGroup: WButtonGroup
    actionConfig: WTableActionConfig[]
  }
>

/**
 * @description Used for boolean type column, provide a default switch column
 */
export type SwitchColumn = CustomTableColumn<'switch', WSwitchProps>
