/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps {
  key: string
  type: 'index' | 'expand' | 'selection'
  index: number | Fn
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
  selectable: Fn
  reserveSelection: boolean

  filters: { text: string; value: string }[]
  filterPlacement: string
  filterMultiple: boolean
  filterMethod: Fn
  filteredValue: any[]
}

// TODO type enhancement
/**
 * @description Override origin column `type` field
 */
export type CustomTableColumn<T, K> = K &
  ElTableColumnProps & {
    /**
     * @description custom column type
     */
    extType: T
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
 * @description Action column type
 */
export type ActionColumn = CustomTableColumn<'action', Record<string, unknown>>
