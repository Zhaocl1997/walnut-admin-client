import type { DataTableSortState } from 'naive-ui'

import type {
  SorterMultiple,
} from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'
import { defaultAppLocaleMessageKeys } from '../../../shared'

export const extendedTablePropKeys: (keyof WTable.Props)[] = ['localeUniqueKey', 'auths', 'apiProps', 'queryFormProps', 'headerLeftBuiltInActions', 'headerLeftExtraActions', 'polling']

export function generateDefaultSortParams<T>(columns: WTable.Column<T>[]) {
  return columns
    ?.map((i) => {
      if (i.defaultSortOrder) {
        return {
          columnKey: i.key,
          order: i.defaultSortOrder,
        }
      }
      return undefined
    })
    .filter(Boolean) as DataTableSortState[]
}

/**
 * @description generate base sort object
 */
export function generateSortParams<T>(sort: DataTableSortState | DataTableSortState[]): WalnutBaseSortParams<T> {
  const getBase = (i: DataTableSortState) => ({
    field: i.columnKey as keyof T,
    order: i.order,
    priority: (i.sorter as SorterMultiple)?.multiple,
  })

  if (Array.isArray(sort)) {
    if (sort.some(i => i.order === false)) {
      return sort.filter(i => i.order !== false).map(getBase)
    }

    return sort.map(getBase)
  }
  else {
    if (sort.order === false)
      return []

    return [getBase(sort)]
  }
}

/**
 * @description generate table item title base on different config
 */
export function getTableTranslated<T>(props: ComputedRef<Partial<WTable.Props<T>>>, item: WTable.Column<T>, helpMsg = false): string {
  const { t } = useAppI18n()

  const key = props.value.localeUniqueKey

  const isLocale = key && getBoolean(item.locale)

  const isHelpMsg = (key: string) => (helpMsg ? `${key}.helpMsg` : key)

  const path = item.key

  return isLocale && path
    ? defaultAppLocaleMessageKeys.includes(String(path))
      ? t(`app.base.${path}`)
      : t(isHelpMsg(`table.${key}.${path}`))
    : typeof item.title === 'string' ? item.title : 'RenderFn'
}
