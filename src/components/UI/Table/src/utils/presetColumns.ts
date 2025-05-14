import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'

export const WTablePresetOrderColumn: WTable.Column<any> = {
  key: 'order',
  width: 100,
}

export const WTablePresetStatusColumn: WTable.Column<any> = {
  key: 'status',
  width: 120,
  extendType: 'dict',
  dictType: 'sys_shared_status',
  filter: true,
  filterMultiple: false,
}

export const WTablePresetCreatedAtColumn: WTable.Column<any> = {
  key: 'createdAt',
  width: 200,
}

export const WTablePresetUpdatedAtColumn: WTable.Column<any> = {
  key: 'updatedAt',
  width: 200,
}
