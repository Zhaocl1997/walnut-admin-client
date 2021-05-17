/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-scoped-slot
 * @description the default column slot prop data
 */
export interface ElTableColumnScopedSlot<T = unknown> extends AnyObject {
  column: any
  row: T
  $index: number | string
}
