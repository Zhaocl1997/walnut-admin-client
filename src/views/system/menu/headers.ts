import type { WTableHeaderItem } from '/@/components/UI/Table'
import { formatTime } from 'easy-fns-ts'
import { getMaybeI18nMsg } from '/@/locales/utils'

export const getMenuTableHeaders = (): WTableHeaderItem[] => {
  return [
    {
      label: 'Name',
      prop: 'title',
      width: '200px',
      align: 'left',
      fixed: 'left',
      formatter: (row) => getMaybeI18nMsg(row.title),
    },
    {
      label: 'Type',
      prop: 'type',
      width: '80px',
    },
    {
      label: 'Icon',
      prop: 'icon',
      width: '80px',
    },
    {
      label: 'Order',
      prop: 'order',
      width: '80px',
      type: 'editable',
      editType: 'inputNumber',
    },
    {
      label: 'Visible',
      prop: 'show',
      width: '100px',
    },
    {
      label: 'Status',
      prop: 'status',
      width: '100px',
    },
    {
      label: 'Created At',
      prop: 'createdAt',
      width: '200px',
      formatter: (row) => formatTime(row.createdAt),
    },
    {
      label: 'Updated At',
      prop: 'updatedAt',
      width: '200px',
      formatter: (row) => formatTime(row.updatedAt),
    },
    {
      type: 'action',
      minWidth: '180',
      fixed: 'right',
    },
  ]
}
