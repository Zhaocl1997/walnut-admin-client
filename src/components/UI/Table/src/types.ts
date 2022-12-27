import type { DataTableColumn, DataTableInst, TagProps } from 'naive-ui'
import type {
  CreateRowKey,
  TableBaseColumn,
} from 'naive-ui/lib/data-table/src/interface'

import type { WForm } from '../../Form'
import type { WButtonProps } from '../../Button'
import type { WTablePropType } from './props'
import type { useEventParams } from '@/hooks/component/useEvent'

export declare namespace WTable {
  type ColumnActionType = 'create' | 'read' | 'delete' | 'detail'

  type HeaderActionType = 'create' | 'update' | 'delete' | 'export' | 'import'

  type FinishLoadingCallback = WForm.onFinishFormLoadingCallback

  interface Auths {
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

    interface ExtendInst {
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

      /**
       * @description get list params
       */
      onGetApiTableListParams: () => Ref<WalnutBaseListParams>
    }

    interface WTableInst extends NDataTableInst, ExtendInst {}
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useTableReturnType = [
      (instance: Inst.WTableInst) => void,
      Inst.WTableInst,
    ]
  }

  /**
   * @description extend table column types
   */
  namespace ExtendType {
    /**
     * @description base extend table column type
     */
    type BaseExtend<T, E> = TableBaseColumn<T> & {
      /**
       * @description extend type string
       */
      extendType?: E

      /**
       * @description column help message
       */
      titleHelpMessage?: string | boolean

      /**
       * @description Used for localed table column which do not need to locale with the whole table
       * TRUE when localeUniqueKey has value, specify FALSE when no need to locale the title or titleHelpMessage.
       */
      locale?: boolean

      /**
       * @description used for column setting title
       */
      _titleText?: () => string

      /**
       * @description internal show flag
       */
      _internalShow?: boolean
    }

    /**
     * @description preset index column, default is used for api table with pageNum and pageSize
     */
    type Index<T = RowData> = BaseExtend<T, 'index'>

    /**
     * @description preset formatter column, used for just some text transform
     */
    type Formatter<T = RowData> = BaseExtend<T, 'formatter'> & {
      formatter: RenderFn<T, string>
    }

    /**
     * @description preset icon column, use `w-icon`by default
     */
    type Icon<T = RowData> = BaseExtend<T, 'icon'> & {
      extendIconName: string | RenderFn<T, string>
    }

    /**
     * @description preset link column, used for a link redirect
     */
    type Link<T = RowData> = BaseExtend<T, 'link'> & {
      onClick: RenderFn<T>
    }

    /**
     * @description preset dictionay column, must provide `dictType`
     * Also support a tag display, pass `tagProps` to show `n-tag` properly
     */
    type Dictionary<T = RowData> = BaseExtend<T, 'dict'> & {
      dictType: string
      tagProps?: RenderFn<T, TagProps>

      // set this true means use `dict.name` as table column label
      useDictNameAsTitle?: boolean
    }

    /**
     * @description normal tag render, provide a tagProps to config. Also provide formatter function
     */
    type Tag<T = RowData> = BaseExtend<T, 'tag'> & {
      tagProps?: RenderFn<T, TagProps>
      formatter: RenderFn<T, string>
    }

    /**
     * @description preset acion column, default includes three buttons: read / delete
     */
    type Action<T = RowData> = BaseExtend<T, 'action'> & {
      /**
       * @description action column button config, order sensitive
       * @default ['create', 'delete', 'read']
       */
      extendActionType?: ColumnActionType[]

      /**
       * @description extend action button
       */
      extendActionButtons?: (WButtonProps & { _show?: RenderFn<T, boolean>; _type: string })[]

      /**
       * @description action column button click event
       */
      onExtendActionType?: ({
        type,
        rowData,
        rowIndex,
      }: {
        type: ColumnActionType | string
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
  // TODO optimise typing
  type Column<T = RowData> =
    | ExtendType.Action<T>
    | ExtendType.Icon<T>
    | ExtendType.Formatter<T>
    | ExtendType.Link<T>
    | ExtendType.Dictionary<T>
    | ExtendType.Tag<T>
    | ExtendType.Index<T>

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
    ApiTableListParams: Ref<WalnutBaseListParams>
    onApiTableQuery: WForm.onFinishFormLoadingCallback
    onApiTableReset: WForm.onFinishFormLoadingCallback
    checkedRowKeys: Ref<StringOrNumber[]>
    tableColumns: Ref<Column[]>
  }
}
