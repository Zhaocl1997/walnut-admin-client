import type { WButtonProps } from '../../../Button'
import type { WTableHeaderItem } from './tableHeaders'
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
  headers?: WTableHeaderItem[]

  total?: MaybeRef<number>

  pageNum?: number

  pageSize?: number

  hasPage?: boolean

  /**
   * @description Index Column relative
   */
  hasIndex?: boolean
  index?: (index: number) => number

  /**
   * @description Select Column relative
   */
  hasSelect?: boolean
  selectable?: (row: any, index: number) => boolean
  reserveSelection?: boolean

  /**
   * @description Expand Column relative
   */
  hasExpand?: boolean

  /**
   * @description Action Column relative
   */
  hasAction?: boolean
  actionButtonGroup?: Array<WButtonProps & { onClick: (e: Event) => void }>
}
