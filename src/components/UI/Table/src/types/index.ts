export * from './tableProps'
export * from './tableHeaders'
export * from './tableHeadersItem'
export * from './tableHeadersItemEditable'
export * from './tableContext'
export * from './tableSlot'

/**
 * @description base pagination field type for w-table
 */
export interface BasePaginationFields {
  total: number
  pageNum: number
  pageSize: number
}
