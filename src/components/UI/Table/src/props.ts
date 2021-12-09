import type { DataTableProps } from 'naive-ui'
import type { WForm } from '../../Form'
import type { WTable } from './types'

import { NDataTable } from 'naive-ui'

export const extendProps = {
  localeUniqueKey: String as PropType<string>,

  onAction: Function as PropType<
    ({ type }: { type: WTable.HeaderActionType }) => void
  >,

  actionList: Array as PropType<WTable.HeaderActionType[]>,

  apiProps: Object as PropType<
    Partial<{
      onBeforeRequest: (params: Recordable) => BaseListParams & Recordable
      listApi: (params: BaseListParams) => Promise<BaseListResponse>
      deleteApi: (id: StringOrNumber) => Promise<unknown>
      deleteManyApi: Fn
    }>
  >,

  queryFormProps: Object as PropType<WForm.Props>,
} as const

export const props = {
  ...(NDataTable.props as DataTableProps),

  ...extendProps,
} as const
