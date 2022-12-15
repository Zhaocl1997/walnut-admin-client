import type {
  SorterMultiple,
  TableBaseColumn,
} from 'naive-ui/lib/data-table/src/interface'

import type { DataTableSortState } from 'naive-ui'
import type { WTable } from '../types'
import { defaultAppLocaleMessageKeys } from '../../../shared'

export const generateDefaultSortParams = (columns: WTable.Column[]) => {
  return columns
    ?.map((i) => {
      if ((i as TableBaseColumn).defaultSortOrder) {
        return {
          columnKey: (i as TableBaseColumn).key,
          order: (i as TableBaseColumn).defaultSortOrder,
        } as DataTableSortState
      }
      return undefined
    })
    .filter(Boolean) as DataTableSortState | DataTableSortState[]
}

/**
 * @description generate base sort object
 */
export const generateSortParams = <T>(
  sort: DataTableSortState | DataTableSortState[],
): BaseSortParams<T> => {
  if (Array.isArray(sort)) {
    if (sort.every(i => i.order === false))
      return []

    return sort.map(i => ({
      field: i.columnKey as keyof T,
      order: i.order,
      priority: (i.sorter as SorterMultiple)?.multiple,
    }))
  }
  else {
    if (sort.order === false)
      return []

    return [
      {
        field: sort.columnKey as keyof T,
        order: sort.order,
        priority: (sort.sorter as SorterMultiple)?.multiple,
      },
    ]
  }
}

/**
 * @description generate base list params
 */
export const generateBaseListParams = (params: BaseListParams) => {
  const ret: BaseListParams = {}

  Object.entries(params).forEach(([key, value]) => {
    if (key === 'sort')
      ret.sort = generateSortParams(value)
    else
      ret[key] = value
  })

  return ret
}

/**
 * @description generate table item title base on different config
 */
export const getTableTranslated = (
  props: ComputedRef<WTable.Props>,
  item: WTable.Column,
  helpMsg = false,
) => {
  const { t } = useAppI18n()

  const key = props.value.localeUniqueKey

  const isLocale = key && getBoolean(item.locale)

  const isHelpMsg = (key: string) => (helpMsg ? `${key}.helpMsg` : key)

  const path = item.key

  return isLocale && path
    ? defaultAppLocaleMessageKeys.includes(path)
      ? t(`app.base.${path}`)
      : t(isHelpMsg(`table.${key}.${path}`))
    : item.title
}
