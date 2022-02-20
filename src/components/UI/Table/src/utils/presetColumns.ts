import type { WTable } from '../types'
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'

import { formatTime } from 'easy-fns-ts'

export const WTablePresetOrderColumn: Pick<TableBaseColumn, 'key' | 'width'> = {
  key: 'order',
  width: 100,
}

export const WTablePresetStatusColumn: Pick<TableBaseColumn, 'key' | 'width'> &
  WTable.ExtendType.Dictionary<any> = {
  key: 'status',
  width: 100,
  extendType: 'dict',
  dictType: 'sys_shared_status',
  tagProps: (row) => ({
    type: row.status ? 'primary' : 'error',
  }),
}

export const WTablePresetCreatedAtColumn: Pick<
  TableBaseColumn,
  'key' | 'width'
> &
  WTable.ExtendType.Formatter<Pick<BaseAppModel, 'createdAt'>> = {
  key: 'createdAt',
  width: 200,
  extendType: 'formatter',
  formatter: (row) => formatTime(row.createdAt!),
}

export const WTablePresetUpdatedAtColumn: Pick<
  TableBaseColumn,
  'key' | 'width'
> &
  WTable.ExtendType.Formatter<Pick<BaseAppModel, 'updatedAt'>> = {
  key: 'updatedAt',
  width: 200,
  extendType: 'formatter',
  formatter: (row) => formatTime(row.updatedAt!),
}
