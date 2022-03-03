import type { DataTableColumn, DataTableInst, TagProps } from 'naive-ui'
import type { useEventParams } from '/@/hooks/component/useEvent'

import { props } from './props'
import { CreateRowKey } from 'naive-ui/lib/data-table/src/interface'
import { WButtonProps } from '../../Button'

export declare namespace WTable {
  type ColumnActionType = 'create' | 'read' | 'delete'

  type HeaderActionType = 'create' | 'update' | 'delete' | 'export' | 'import'

  type SetProps = (p: Partial<Props>) => void

  interface RowData {
    [key: string]: unknown
  }

  type RenderFn<T, R = void> = (rowData: T, rowIndex?: number) => R

  namespace Inst {
    type NDataTableInst = DataTableInst

    type ExtendInst = {
      setProps: SetProps
      onInit: (extraParams?: Recordable<any>) => Promise<void>
      onDelete: (id: StringOrNumber) => Promise<void>
      onDeleteMany: () => Promise<void>
    }

    interface WTableInst extends NDataTableInst, ExtendInst {}
  }

  namespace Hook {
    type useTableReturnType = [
      (instance: Inst.WTableInst) => void,
      Inst.WTableInst
    ]
  }

  namespace ExtendType {
    interface BaseExtend<E> {
      extendType?: E
    }

    interface Action<T = RowData> extends BaseExtend<'action'> {
      extendActionType?: ColumnActionType[]
      onCreate?: RenderFn<T>
      onRead?: RenderFn<T>
      onDelete?: RenderFn<T>

      dropdownButtons?: WButtonProps[]
    }

    interface Icon<T = RowData> extends BaseExtend<'icon'> {
      extendIconName: string | RenderFn<T, string>
    }

    interface Formatter<T = RowData> extends BaseExtend<'formatter'> {
      formatter: RenderFn<T, string>
    }

    interface Link<T = RowData> extends BaseExtend<'link'> {
      onClick: RenderFn<T, void>
    }

    interface Dictionary<T = RowData> extends BaseExtend<'dict'> {
      dictType: string
      tagProps?: RenderFn<T, TagProps>
    }

    type Index<T = RowData> = BaseExtend<'index'>
  }

  type Column<T = RowData> = DataTableColumn<T> &
    (
      | ExtendType.Action<T>
      | ExtendType.Icon<T>
      | ExtendType.Formatter<T>
      | ExtendType.Link<T>
      | ExtendType.Dictionary<T>
      | ExtendType.Index<T>
    )

  interface Props<T = RowData>
    extends Partial<
      Omit<ExtractPropTypes<typeof props>, 'columns' | 'rowKey'>
    > {
    /**
     * @description Rewrite NDataTable columns type, add our own custom column type
     */
    columns?: Column<T>[]

    /**
     * @override
     */
    rowKey?: CreateRowKey<T>
  }

  namespace Params {
    type Entry =
      | useEventParams<'hook', Inst.ExtendInst>
      | useEventParams<'action', { type: HeaderActionType }>
  }

  interface Context {
    tableRef: Ref<Inst.NDataTableInst | undefined>
    onEvent: (params: Params.Entry) => void
    tableProps: ComputedRef<Props>
    onInit: (extraParams?: Recordable<any> | undefined) => Promise<void>
    initParams: Ref<BaseListParams>
    onQuery: PromiseFn
    onReset: PromiseFn
    checkedRowKeys: Ref<StringOrNumber[]>
    tableColumns: Ref<Column[]>
  }
}
