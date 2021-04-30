/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps {
  key: string
  type: 'selection' | 'index' | 'expand'
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

/**
 * @description extend from `ElTable-column` props
 */
export interface WTableHeaderItem extends Partial<ElTableColumnProps> {
  children?: WTableHeaderItem[]
}
