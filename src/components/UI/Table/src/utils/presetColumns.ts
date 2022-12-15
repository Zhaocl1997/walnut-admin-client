import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'

export const WTablePresetOrderColumn: Pick<TableBaseColumn, 'key' | 'width'> = {
  key: 'order',
  width: 100,
}

export const WTablePresetStatusColumn: Pick<
  TableBaseColumn,
  'key' | 'width' | 'filter' | 'filterMultiple'
> &
WTable.ExtendType.Dictionary<any> = {
  key: 'status',
  width: 120,
  extendType: 'dict',
  dictType: 'sys_shared_status',
  filter: true,
  filterMultiple: false,
}

export const WTablePresetCreatedAtColumn: Pick<
  TableBaseColumn,
  'key' | 'width'
> = {
  key: 'createdAt',
  width: 200,
}

export const WTablePresetUpdatedAtColumn: Pick<
  TableBaseColumn,
  'key' | 'width'
> = {
  key: 'updatedAt',
  width: 200,
}
