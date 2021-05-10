import type { WTableEditCellEmitParams } from './tableContext'
import type { WTableHeaderItem } from './tableHeaders'
import type { WTableEditableColumnActionConfig } from './tableHeadersItem'
import type { ElTableColumnScopedSlot } from './tableSlot'
import type { MaybeRef } from '/~/utils'

export interface ElTableStyleAndClassParams {
  row: any
  column: any
  rowIndex: number
  columnIndex: number
}

export type ElTableStyle = (
  params: Partial<ElTableStyleAndClassParams>
) => void | CSSStyleDeclaration

export type ElTableClass = (
  params: Partial<ElTableStyleAndClassParams>
) => void | string

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-attributes
 */
export interface ElTableProps {
  data: MaybeRef<any[]>
  height: string | number
  maxHeight: string | number
  stripe: boolean
  border: boolean
  size: ComponentSize
  fit: boolean
  showHeader: boolean
  highlightCurrentRow: boolean
  currentRowKey: string | number

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
 * @description extend from `ElTable` props
 */
export interface WTableProps extends Partial<ElTableProps> {
  /**
   * @description table header for renderer
   */
  headers?: WTableHeaderItem[]

  /**
   * @description has pagination or not
   */
  hasPage?: boolean

  /**
   * @description has table settings or not
   */
  hasSettings?: boolean

  /**
   * @description table total count, used for pagination
   */
  total?: number

  /**
   * @description table page number, used for pagination
   */
  pageNum?: number

  /**
   * @description table current page, used for pagination
   */
  pageSize?: number

  onAction?: (
    type: WTableEditableColumnActionConfig,
    scope: ElTableColumnScopedSlot
  ) => void

  onEdit?: (val: WTableEditCellEmitParams) => void
}
