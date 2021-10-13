import type { WTable } from '../../../components/UI/Table'
import { formatTime } from 'easy-fns-ts'
import { getMaybeI18nMsg } from '/@/locales/utils'
import { Menu } from '/@/router/types'

export const getMenuTableHeaders = (): WTable.Header.Item.Props<Menu>[] => {
  return [
    {
      columnProps: {
        label: 'Name',
        prop: 'title',
        width: '200px',
        align: 'left',
        fixed: 'left',
        formatter: (row) => getMaybeI18nMsg(row.title),
      },
    },
    {
      columnProps: {
        label: 'Type',
        prop: 'type',
        width: '80px',
      },
    },
    {
      type: 'slot',
      columnProps: {
        label: 'Icon',
        prop: 'icon',
        width: '80px',
      },
    },
    {
      columnProps: {
        label: 'Order',
        prop: 'order',
        width: '80px',
        // type: 'editable',
        // editType: 'inputNumber',
      },
    },
    {
      columnProps: {
        label: 'Visible',
        prop: 'show',
        width: '100px',
      },
    },
    {
      columnProps: {
        label: 'Status',
        prop: 'status',
        width: '100px',
      },
    },
    {
      columnProps: {
        label: 'Created At',
        prop: 'createdAt',
        width: '200px',
        formatter: (row) => formatTime(row.createdAt!),
      },
    },
    {
      columnProps: {
        label: 'Updated At',
        prop: 'updatedAt',
        width: '200px',
        formatter: (row) => formatTime(row.updatedAt!),
      },
    },
    {
      type: 'action',
      columnProps: {
        minWidth: '180',
        fixed: 'right',
      },
    },
  ]
}
