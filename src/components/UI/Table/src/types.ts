import type { DataTableColumn, DataTableInst, TagProps } from 'naive-ui'
import type { CreateRowKey } from 'naive-ui/lib/data-table/src/interface'

import type { useEventParams } from '/@/hooks/component/useEvent'

import type { WForm } from '../../Form'
import type { WButtonProps } from '../../Button'
import type { WTablePropType } from './props'

export declare namespace WTable {
  type ColumnActionType = 'create' | 'read' | 'delete'

  type HeaderActionType = 'create' | 'update' | 'delete' | 'export' | 'import'

  type FinishLoadingCallback = WForm.onFinishFormLoadingCallback

  type Auths = {
    list?: string
    create?: string
    read?: string
    update?: string
    delete?: string
    deleteMany?: string
    import?: string
    export?: string
  }

  /**
   * @description Set props
   */
  type SetProps<T = RowData> = (p: Partial<Props<T>>) => void

  /**
   * @description render function
   */
  type RenderFn<T, R = void> = (rowData: T, rowIndex?: number) => R

  /**
   * @description Inst
   */
  namespace Inst {
    type NDataTableInst = DataTableInst

    type ExtendInst = {
      setProps: SetProps

      /**
       * @description API table default init function
       */
      onApiTableList: (extraParams?: Recordable<any>) => Promise<void>

      /**
       * @description API table default delete function
       */
      onApiTableDelete: (id: StringOrNumber) => Promise<void>

      /**
       * @description API table default delete many function
       */
      onApiTableDeleteMany: () => Promise<void>
    }

    interface WTableInst extends NDataTableInst, ExtendInst {}
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useTableReturnType = [
      (instance: Inst.WTableInst) => void,
      Inst.WTableInst
    ]
  }

  /**
   * @description extend table column types
   */
  namespace ExtendType {
    interface BaseExtend<E> {
      extendType?: E
    }

    /**
     * @description preset index column, default is used for api table with pageNum and pageSize
     */
    type Index<T = RowData> = BaseExtend<'index'>

    /**
     * @description preset formatter column, used for just some text transform
     */
    interface Formatter<T = RowData> extends BaseExtend<'formatter'> {
      formatter: RenderFn<T, string>
    }

    /**
     * @description preset icon column, use `w-icon`by default
     */
    interface Icon<T = RowData> extends BaseExtend<'icon'> {
      extendIconName: string | RenderFn<T, string>
    }

    /**
     * @description preset link column, used for a link redirect
     */
    interface Link<T = RowData> extends BaseExtend<'link'> {
      onClick: RenderFn<T>
    }

    /**
     * @description preset dictionay column, must provide `dictType`
     * Also support a tag display, pass `tagProps` to show `n-tag` properly
     */
    interface Dictionary<T = RowData> extends BaseExtend<'dict'> {
      dictType: string
      tagProps?: RenderFn<T, TagProps>
    }

    /**
     * @description preset acion column, default includes three buttons: read / delete
     */
    interface Action<T = RowData> extends BaseExtend<'action'> {
      /**
       * @description action column button config
       * @default ['create', 'delete', 'read']
       */
      extendActionType?: ColumnActionType[]

      /**
       * @description action column button click event
       */
      onExtendActionType?: ({
        type,
        rowData,
        rowIndex,
      }: {
        type: ColumnActionType
        rowData: T
        rowIndex?: number
      }) => Promise<void> | void

      /**
       * @description extend table column dropdown buttons
       */
      extraDropdownButtons?: WButtonProps[]
    }
  }

  /**
   * @description extend column entry
   */
  type Column<T = RowData> = DataTableColumn<T> &
    (
      | ExtendType.Action<T>
      | ExtendType.Icon<T>
      | ExtendType.Formatter<T>
      | ExtendType.Link<T>
      | ExtendType.Dictionary<T>
      | ExtendType.Index<T>
    )

  /**
   * @description Props
   */
  interface Props<T = RowData>
    extends Partial<Omit<WTablePropType, 'columns' | 'rowKey'>> {
    /**
     * @override
     * @description Rewrite NDataTable columns type, add our own custom column type
     * And better generic support
     */
    columns?: Column<T>[]

    /**
     * @override
     * @description for generic
     */
    rowKey?: CreateRowKey<T>
  }

  /**
   * @description Emit
   */
  namespace Emit {
    type Entry =
      | useEventParams<'hook', Inst.ExtendInst>
      | useEventParams<'tableHeaderActions', { type: HeaderActionType }>
  }

  /**
   * @description Table context
   */
  interface Context {
    tableRef: Ref<Inst.NDataTableInst | undefined>
    onEvent: (params: Emit.Entry) => void
    tableProps: ComputedRef<Props>
    onApiTableList: (extraParams?: Recordable<any> | undefined) => Promise<void>
    ApiTableListParams: Ref<BaseListParams>
    onApiTableQuery: WForm.onFinishFormLoadingCallback
    onApiTableResetListParams: WForm.onFinishFormLoadingCallback
    checkedRowKeys: Ref<StringOrNumber[]>
    tableColumns: Ref<Column[]>
  }
}
