import type {
  WTableEditableColumn,
  ElTableColumnScopedSlot,
} from '/@/components/UI/Table'

export type WTableEditableColumnHookProps = SetupProp<
  {},
  {
    row?: Pick<ElTableColumnScopedSlot, 'row'> | undefined
    item?: WTableEditableColumn | undefined
  }
>
