import type { DataTableProps } from 'naive-ui'
import { NDataTable } from 'naive-ui'
import type { WForm } from '../../Form'
import type { WButtonProps } from '../../Button'
import type { WTable } from './types'

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
      onBeforeRequest: (params: Recordable) => BaseListParams & Recordable
      listApi: (params: BaseListParams) => Promise<BaseListResponse>
      deleteApi: (id: StringOrNumber) => Promise<unknown>
      deleteManyApi: Fn
    }>
  >,

  queryFormProps: Object as PropType<WForm.Props>,

  auths: Object as PropType<WTable.Auths>,
} as const

export const props = {
  ...(NDataTable.props as DataTableProps),

  ...extendProps,
} as const

export type WTablePropType = ExtractPropTypes<typeof props>
