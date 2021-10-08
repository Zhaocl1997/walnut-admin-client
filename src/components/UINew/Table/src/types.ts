import type { DataTableProps, DataTableColumn } from 'naive-ui'
import type { useEventParams } from '/@/hooks/component/useEvent'

export declare namespace WTable {
  namespace ExtendType {
    interface Action {
      extendType?: 'action'
      extendActionType?: ('create' | 'read' | 'delete')[]
    }

    interface Icon {
      extendType?: 'icon'
      extendIconName?: string
    }
  }

  type Columns = (DataTableColumn | ExtendType.Action | ExtendType.Icon)[]

  interface Props extends Omit<DataTableProps, 'columns'> {
    columns: Columns
  }

  namespace Params {
    type Entry = useEventParams<'hook', any>
  }
}
