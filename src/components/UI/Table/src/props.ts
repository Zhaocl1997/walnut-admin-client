import type { DataTableProps } from 'naive-ui'
import type { WButtonProps } from '../../Button'
import type { WForm } from '../../Form'
import type { WTable } from './types'
import { NDataTable } from 'naive-ui'

export const extendProps = {
  localeUniqueKey: String as PropType<string>,

  onTableHeaderActions: Function as PropType<
    ({ type }: { type: WTable.HeaderActionType }) => void
  >,

  headerActions: {
    type: Array as PropType<WTable.HeaderActionType[]>,
    default: () => ['create', 'delete'],
  },

  extraHeaderActions: {
    type: Array as PropType<WButtonProps[]>,
    default: () => [],
  },

  // TODO prop and generic, need to make a choice
  apiProps: Object as PropType<
    Partial<{
      onBeforeRequest: (params: Recordable) => WalnutBaseListParams & Recordable
      listApi: (params: WalnutBaseListParams) => Promise<WalnutBaseListResponse>
      deleteApi: (id: StringOrNumber) => Promise<unknown>
      deleteManyApi: Fn
    }>
  >,

  queryFormProps: Object as PropType<WForm.Props>,

  auths: Object as PropType<WTable.Auths>,

  polling: Number as PropType<number>,
} as const

export const props = {
  ...(NDataTable.props as DataTableProps),

  ...extendProps,
} as const

export type WTablePropType = ExtractPropTypes<typeof props>
