import type { useEventParams } from '@/hooks/component/useEvent'
import type { IHooksUseProps } from '@/hooks/core/useProps'

import type { DataTableBaseColumn, DataTableColumn, DataTableCreateRowKey, DataTableCreateSummary, DataTableExpandColumn, DataTableFilterState, DataTableInst, DataTableSelectionColumn, DataTableSortState, PaginationProps, PopoverProps, ScrollbarProps, TagProps } from 'naive-ui'
import type { HTMLAttributes } from 'vue'
import type { ICompUIButtonProps } from '../../Button'
import type { WForm } from '../../Form'
import type { ICompUIIconButtonProps } from '../../IconButton'
import type { ICompUITableHooksMethods } from './hooks/useTableMethods'

export declare namespace WTable {
  type ColumnActionType = 'create' | 'read' | 'delete' | 'detail'

  type HeaderLeftBulitInActionType = 'create' | 'update' | 'delete' | 'export' | 'import'

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
   * @description callback function
   */
  type TableFnCallback<T, R = void> = (rowData: T, rowIndex?: number) => R

  /**
   * @description set table props
   */
  type SetTableProps<T> = IHooksUseProps<Props<T>>['setProps']

  /**
   * @description Inst
   */
  namespace Inst {
    type NDataTableInst = DataTableInst

    interface ExtendInst<T> {
      setProps: SetTableProps<T>

      /**
       * @description API table default init function
       */
      onApiList: () => Promise<void>

      /**
       * @description API table default delete function
       */
      onApiDelete: (id: StringOrNumber) => Promise<T>

      /**
       * @description API table default delete many function
       */
      onApiDeleteMany: (ids: string) => Promise<T[]>

      /**
       * @description get list params
       */
      onGetApiListParams: () => WalnutBaseListParams<T>

    }

    interface WTableInst<T> extends Partial<NDataTableInst>, ExtendInst<T> { }
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useTableReturnType<T> = [
      (instance: Inst.WTableInst<T>) => void,
      ICompUITableHooksMethods<T>,
    ]
  }

  /**
   * @description Props
   */
  interface Props<T = Recordable> {
    // original
    allowCheckingNotLoaded?: boolean
    bordered?: boolean
    bottomBordered?: boolean
    checkedRowKeys?: StringOrNumber[]
    cascade?: boolean
    childrenKey?: string
    defaultCheckedRowKeys?: StringOrNumber[]
    defaultExpandedRowKeys?: StringOrNumber[]
    defaultExpandAll?: boolean
    expandedRowKeys?: StringOrNumber[]
    filterIconPopoverProps?: PopoverProps
    flexHeight?: boolean
    getCsvCell?: (value: any, row: object, col: DataTableBaseColumn) => string
    getCsvHeader?: (cols: Array<DataTableColumn>) => string
    headerHeight?: number
    heightForRow?: (rowData: object, index: number) => number
    indent?: number
    loading?: boolean
    maxHeight?: StringOrNumber
    minHeight?: StringOrNumber
    minRowHeight?: number
    paginateSinglePage?: boolean
    pagination?: boolean | PaginationProps
    paginationBehaviorOnFilter?: 'first' | 'current'
    remote?: boolean
    renderCell?: (value: any, rowData: object, column: DataTableBaseColumn) => VNodeChild
    renderExpandIcon?: ({ expanded, rowData }: { expanded: boolean, rowData: object }) => VNodeChild
    rowClassName?: string | ((rowData: object, index: number) => string)
    rowProps?: (rowData: object, rowIndex: number) => HTMLAttributes
    scrollX?: StringOrNumber
    scorllbarProps?: ScrollbarProps
    singleColumn?: boolean
    singleLine?: boolean
    size?: 'small' | 'medium' | 'large'
    spinProps?: { strokeWidth?: number, stroke?: string }
    stickyExpandedRows?: boolean
    striped?: boolean
    summary?: DataTableCreateSummary
    summayPlacement?: 'top' | 'bottom'
    tableLayout?: 'auto' | 'fixed'
    virtualScroll?: boolean
    virtualScrollHeader?: boolean
    virtualScrollX?: boolean
    onUpdateCheckedRowKeys?: (keys: Array<string | number>) => void
    onUpdateSorter?: (options: DataTableSortState | DataTableSortState[] | null) => void
    onUpdateFilters?: (filters: DataTableFilterState, initiatorColumn: DataTableBaseColumn) => void

    /**
     * @override
     * @description for generic
     */
    data?: T[]

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
    rowKey?: DataTableCreateRowKey<T>

    /**
     * @extends
     * @description locale unique key, for this table fields
     * @example 'locale' / 'lang'
     */
    localeUniqueKey?: string

    /**
     * @extends
     * @description api table auth controll
     */
    auths?: Auths

    /**
     * @extends
     * @description api relative props
     */
    apiProps?: {
      /**
       * @description before request hook, you can change the request params here or do some request
       * @retrurn WalnutBaseListParams<T>
       */
      onBeforeRequest: (params: T) => Promise<T>

      /**
       * @description list api, need to follow response structure
       * @retrurn WalnutBaseListResponse<T>
       */
      listApi?: (params: WalnutBaseListParams<T>) => Promise<WalnutBaseListResponse<T>>

      /**
       * @description delete api, need to follow response structure
       * @retrurn T
       */
      deleteApi?: (id: StringOrNumber) => Promise<T>

      /**
       * @description delete many api, need to follow response structure
       * @retrurn T[]
       */
      deleteManyApi?: (ids: string) => Promise<T[]>
    }

    /**
     * @extends
     * @description query form props
     */
    queryFormProps?: WForm.Props<T>

    /**
     * @extends
     * @description header left built in actions
     */
    headerLeftBuiltInActions?: {
      _builtInType?: WTable.HeaderLeftBulitInActionType

      /**
       * @description click event, do not use buttonProps.onClick
       */
      onPresetClick?: () => void
    }[]

    /**
     * @extends
     * @description header left extra actions
     */
    headerLeftExtraActions?: ICompUIButtonProps[]

    /**
     * @extends
     * @description polling milliseconds
     */
    polling?: number
  }

  /**
   * @description Table context
   */
  interface Context<T> {
    tableRef: Ref<Inst.NDataTableInst>
    tableColumns: Ref<Column<T>[]>
    tableEvent: (val: Params.UseEvent<T>) => void
    tablePropsCtx: IHooksUseProps<Props<T>>

    apiListParams: Ref<WalnutBaseListParams<T>>
    onApiList: () => Promise<void>
    onApiQuery: WForm.onFinishFormLoadingCallback
    onApiReset: WForm.onFinishFormLoadingCallback

    checkedRowKeys: Ref<StringOrNumber[]>
  }

  /**
   * @description Table Emits
   */
  interface Emits<T> {
    hook: [inst: Inst.WTableInst<T>]
  }

  /**
   * @description Table Params
   */
  namespace Params {
    type UseEvent<T> =
      | useEventParams<'hook', Inst.WTableInst<T>>
  }

  /**
   * @description Table Column
   */
  type Column<T> =
    | (ExtendType.Action<T>
      | ExtendType.Icon<T>
      | ExtendType.Formatter<T>
      | ExtendType.Link<T>
      | ExtendType.Dictionary<T>
      | ExtendType.Tag<T>
      | ExtendType.Index<T>)
    & (Partial<DataTableSelectionColumn<T>>
      | Partial<DataTableExpandColumn<T>>)

  namespace ExtendType {
    /**
     * @description action button basic extend prop
     */
    interface ActionButtonsBasic<T> {
      /**
       * @description custom show callback for action button
       */
      _disabled?: TableFnCallback<T, boolean> | boolean

      /**
       * @description custom show callback for action button
       */
      _show?: TableFnCallback<T, boolean> | boolean

      /**
       * @description button show in dropdown or outside
       */
      _dropdown?: boolean
    }

    /**
     * @description action column buttons type
     */
    interface ActionButtons<T> extends ActionButtonsBasic<T>, ICompUIIconButtonProps {
      /**
       * @description builtIn button, support `create` / `read` / `delete` / `detail`
       */
      _builtInType: ColumnActionType

      /**
       * @description click event, do not use buttonProps.onClick
       */
      onPresetClick?: TableFnCallback<T, void>
    }

    /**
     * @description base extend table column type
     */
    type BaseExtend<T, E> = Omit<DataTableBaseColumn<T>, 'type'> & {
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
    type Index<T = Recordable> = BaseExtend<T, 'index'>

    /**
     * @description preset formatter column, used for just some text transform
     */
    type Formatter<T = Recordable> = BaseExtend<T, 'formatter'> & {
      formatter: TableFnCallback<T, string>
    }

    /**
     * @description preset icon column, use `WIcon`by default
     */
    type Icon<T = Recordable> = BaseExtend<T, 'icon'> & {
      extendIconName: string | TableFnCallback<T, string>
    }

    /**
     * @description preset link column, used for a link redirect
     */
    type Link<T = Recordable> = BaseExtend<T, 'link'> & {
      onClick: TableFnCallback<T>
      formatter: TableFnCallback<T, string>
    }

    /**
     * @description preset dictionay column, must provide `dictType`
     * Also support a tag display, pass `tagProps` to show `n-tag` properly
     */
    type Dictionary<T = Recordable> = BaseExtend<T, 'dict'> & {
      dictType: string
      tagProps?: TableFnCallback<T, TagProps>

      // set this true means use `dict.name` as table column label
      useDictNameAsTitle?: boolean
    }

    /**
     * @description normal tag render, provide a tagProps to config. Also provide formatter function
     */
    type Tag<T = Recordable> = BaseExtend<T, 'tag'> & {
      tagProps?: TableFnCallback<T, TagProps>
      formatter: TableFnCallback<T, string>
    }

    /**
     * @description preset acion column, default includes three buttons: read / delete
     */
    type Action<T = Recordable> = BaseExtend<T, 'action'> & {

      /**
       * @description action column button config
       */
      actionButtons: ActionButtons<T>[]
    }
  }

}
