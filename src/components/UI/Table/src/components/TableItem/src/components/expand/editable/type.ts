import type {
  WTableEditableColumn,
  ElTableColumnScopedSlot,
} from '/@/components/UI/Table'

export type WTableEditableColumnHookProps = SetupProp<
  AnyObject,
  {
    row?: Pick<ElTableColumnScopedSlot, 'row'> | undefined
    item?: WTableEditableColumn | undefined
  }
>
