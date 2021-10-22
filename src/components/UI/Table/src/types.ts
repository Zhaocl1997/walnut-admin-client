import type { DataTableProps, DataTableColumn, DataTableInst } from 'naive-ui'
import type { InternalRowData } from 'naive-ui/lib/data-table/src/interface'
import type { useEventParams } from '/@/hooks/component/useEvent'

import { props } from './props'

export declare namespace WTable {
  namespace Inst {
    type NDataTableInst = DataTableInst

    interface WTableInst extends NDataTableInst {
      setProps: Fn
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

    interface Action<T = InternalRowData> extends BaseExtend<'action'> {
      extendActionType?: ('create' | 'read' | 'delete')[]
      onCreate?: (rowData: T, rowIndex?: number) => void
      onRead?: (rowData: T, rowIndex?: number) => void
      onDelete?: (rowData: T, rowIndex?: number) => void
    }

    interface Icon<T = InternalRowData> extends BaseExtend<'icon'> {
      extendIconName: string | ((rowData: T, rowIndex?: number) => string)
    }

    interface Formatter<T = InternalRowData> extends BaseExtend<'formatter'> {
      formatter: (rowData: T, rowIndex?: number) => string
    }
  }

  type Column<T = InternalRowData> =
    | DataTableColumn<T>
    | (DataTableColumn<T> & ExtendType.Action<T>)
    | (DataTableColumn<T> & ExtendType.Icon<T>)
    | (DataTableColumn<T> & ExtendType.Formatter<T>)

  interface Props<T = InternalRowData>
    extends Omit<DataTableProps, 'columns'>,
      ExtractPropTypes<typeof props> {
    columns: Column<T>[]
  }

  namespace Params {
    type Entry = useEventParams<'hook', any>
  }
}
