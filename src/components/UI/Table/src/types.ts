import type { DataTableProps, DataTableColumn, DataTableInst } from 'naive-ui'
import type { useEventParams } from '/@/hooks/component/useEvent'

import { props } from './props'

export declare namespace WTable {
  interface RowData {
    [key: string]: unknown
  }

  type RenderFn<T, R = void> = (rowData: T, rowIndex?: number) => R

  namespace Inst {
    type NDataTableInst = DataTableInst

    interface WTableInst extends NDataTableInst {
      setProps: (props: MaybeRef<Props<any>>) => void
    }
  }

  namespace Hook {
    type useTableReturnType = [
      (instance: Inst.WTableInst) => void,
      Partial<Inst.WTableInst>
    ]
  }

  namespace ExtendType {
    interface BaseExtend<E> {
      extendType?: E
    }

    interface Action<T = RowData> extends BaseExtend<'action'> {
      extendActionType?: ('create' | 'read' | 'delete')[]
      onCreate?: RenderFn<T>
      onRead?: RenderFn<T>
      onDelete?: RenderFn<T>
    }

    interface Icon<T = RowData> extends BaseExtend<'icon'> {
      extendIconName: string | RenderFn<T, string>
    }

    interface Formatter<T = RowData> extends BaseExtend<'formatter'> {
      formatter: RenderFn<T, string>
    }
  }

  type Column<T = RowData> =
    | DataTableColumn<T> &
        (ExtendType.Action<T> | ExtendType.Icon<T> | ExtendType.Formatter<T>)

  interface Props<T = RowData>
    extends Omit<DataTableProps, 'columns'>,
      ExtractPropTypes<typeof props> {
    columns: Column<T>[]
  }

  namespace Params {
    type Entry = useEventParams<'hook', any>
  }
}
