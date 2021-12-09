import type {
  SorterMultiple,
  SortState,
} from 'naive-ui/lib/data-table/src/interface'

/**
 * @description generate base sort object
 */
const generateSortParams = <T>(
  sort: SortState | SortState[]
): BaseSortParams<T> => {
  if (Array.isArray(sort)) {
    return sort.map((i) => ({
      field: i.columnKey as keyof T,
      order: i.order,
      priority: (i.sorter as SorterMultiple).multiple,
    }))
  } else {
    return [
      {
        field: sort.columnKey as keyof T,
        order: sort.order,
        priority: (sort.sorter as SorterMultiple).multiple,
      },
    ]
  }
}

/**
 * @description generate base list params
 */
export const generateBaseListParams = (params: BaseListParams) => {
  const ret: BaseListParams = {}

  Object.entries(params).map(([key, value]) => {
    if (key === 'sort') {
      ret['sort'] = generateSortParams(value)
    } else {
      ret[key] = value
    }
  })

  return ret
}
