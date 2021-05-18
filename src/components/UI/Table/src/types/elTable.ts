interface ElTableStyleAndClassParams {
  row: any
  column: any
  rowIndex: number
  columnIndex: number
}

type ElTableStyle = (
  params: Partial<ElTableStyleAndClassParams>
) => void | CSSStyleDeclaration

type ElTableClass = (
  params: Partial<ElTableStyleAndClassParams>
) => void | string

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-attributes
 */
export interface ElTableProps<T = unknown> {
  data: T[]
  height: StringOrNumber
  maxHeight: StringOrNumber
  stripe: boolean
  border: boolean
  size: ComponentSize
  fit: boolean
  showHeader: boolean
  highlightCurrentRow: boolean
  currentRowKey: StringOrNumber

  rowClassName: ElTableClass
  rowStyle: ElTableStyle

  cellClassName: ElTableClass
  cellStyle: ElTableStyle

  headerRowClassName: ElTableClass
  headerRowStyle: ElTableStyle

  headerCellClassName: ElTableClass
  headerCellStyle: ElTableStyle

  rowKey: Fn | string
  emptyText: string
  defaultExpandAll: boolean
  expandRowKeys: any[]

  defaultSort: { prop: string; order: 'descending' | 'ascending' | null }
  tooltipEffect: 'dark' | 'light'
  showSummary: boolean
  sumText: string
  summaryMethod: ({ columns, data }: { columns: any[]; data: any }) => any
  spanMethod: (params: Partial<ElTableStyleAndClassParams>) => void
  selectOnIndeterminate: boolean
  indent: number
  lazy: boolean
  load: Fn
  treeProps: { hasChildren: string; children: string }
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
 */
export interface ElTableColumnProps<T = unknown> {
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
  formatter: (row: T) => StringOrNumber | undefined
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
