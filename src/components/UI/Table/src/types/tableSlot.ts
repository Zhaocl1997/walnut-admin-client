export interface ElTableColumnScopedSlot extends Record<string, unknown> {
  column: any
  row: any
  $index: number | string
}
