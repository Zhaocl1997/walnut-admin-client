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

  apiProps: Object as PropType<{
    api: (params: BaseListParams) => Promise<BaseListResponse>
  }>,

  queryFormProps: Object as PropType<WForm.Props>,
}

export const props = {
  ...(NDataTable.props as DataTableProps),

  ...extendProps,
} as const
