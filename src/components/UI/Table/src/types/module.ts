import type { ComputedRef, Ref, VNode } from 'vue'

import type { WInputProps } from '../../../Input'
import type { WInputNumberProps } from '../../../InputNumber'
import type { WSelectProps } from '../../../Select'
import type { WSwitchProps } from '../../../Switch'
import type { WButtonGroupItem } from '../../../ButtonGroup'

/**
 * @description WTable Type Module
 */
export declare namespace WTable {
  /**
   * @description original el-table props
   */
  namespace ElTable {
    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-scoped-slot
     * @description el-table-column default slot data
     */
    interface SlotData<T = any> extends AnyObject {
      column: any
      row: T
      $index: number | string
    }

    interface ElTableStyleAndClassParams {
      row: any
      column: any
      rowIndex: number
      columnIndex: number
    }

    type ElTableStyle = (
      params: Partial<ElTableStyleAndClassParams>
    ) => void | CSSStyleDeclaration

    type ElTableClass = (
      params: Partial<ElTableStyleAndClassParams>
    ) => void | string

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-attributes
     */
    interface ElTableProps<T = any> {
      data: T[]
      height: StringOrNumber
      maxHeight: StringOrNumber
      stripe: boolean
      border: boolean
      size: ComponentSize
      fit: boolean
      showHeader: boolean
      highlightCurrentRow: boolean
      currentRowKey: StringOrNumber

      rowClassName: ElTableClass
      rowStyle: ElTableStyle

      cellClassName: ElTableClass
      cellStyle: ElTableStyle

      headerRowClassName: ElTableClass
      headerRowStyle: ElTableStyle

      headerCellClassName: ElTableClass
      headerCellStyle: ElTableStyle

      rowKey: Fn | string
      emptyText: string
      defaultExpandAll: boolean
      expandRowKeys: any[]

      defaultSort: { prop: string; order: 'descending' | 'ascending' | null }
      tooltipEffect: 'dark' | 'light'
      showSummary: boolean
      sumText: string
      summaryMethod: ({ columns, data }: { columns: any[]; data: any }) => any
      spanMethod: (params: Partial<ElTableStyleAndClassParams>) => void
      selectOnIndeterminate: boolean
      indent: number
      lazy: boolean
      load: Fn
      treeProps: { hasChildren: string; children: string }
    }

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes
     */
    interface ElTableColumnProps<T = any> {
      key: string
      type: 'index' | 'selection' | 'expand'
      columnKey: string
      label: string
      prop: string
      width: string
      minWidth: string
      fixed: boolean | 'left' | 'right'
      renderHeader: Fn
      sortable: boolean | 'custom'
      sortMethod: Fn
      sortBy: string | any[] | Fn
      sortOrders: ['ascending', 'descending', null]
      resizable: boolean
      formatter: (row: T) => StringOrNumber | undefined
      showOverflowTooltip: boolean
      align: 'left' | 'center' | 'right'
      headerAlign: 'left' | 'center' | 'right'
      className: string
      labelClassName: string

      filters: { text: string; value: string }[]
      filterPlacement: string
      filterMultiple: boolean
      filterMethod: Fn
      filteredValue: any[]
    }
  }

  /**
   * @description w-table event params
   */
  namespace Params {
    type EventCustom<E, P> = {
      eventName: E
      eventParams: P
    }

    /**
     * @description refer to `edit` event params
     * 1. newValue: the new value user just edited
     * 2. row: refer to `ElTableColumnScopedSlot` row type
     * 3. prop: refer to `WTableHeaderItem` prop field
     * 4. loadStart: start the loading meanually
     * 5. loadEnd: end the loading meanually
     */
    interface Edit<T = any> {
      newValue: any
      row: T
      prop: string
      loadStart: Fn
      loadEnd: Fn
    }

    /**
     * @description refer to `action` event params
     * 1. type: one of  'create' | 'edit' | 'delete'
     * 2. scope: refer to `ElTable.SlotData`
     */
    interface Action<T = any> {
      type: Header.Extend.Action.Config
      scope: ElTable.SlotData<T>
    }

    /**
     * @description refer to `pagination` event params
     */
    interface Page {
      pageNum: number
      pageSize: number
    }

    interface PageState extends Page {
      total: number
    }

    // entry
    type Entry =
      | EventCustom<'edit', Edit>
      | EventCustom<'action', Action>
      | EventCustom<'page', Page>
  }

  /**
   * @description w-table event
   */
  namespace Event {
    type Edit<T = any> = (val: Params.Edit<T>) => void

    type Action<T = any> = (val: Params.Action<T>) => void

    type Page = (val: Params.Page) => void

    // entry
    type Entry = Edit | Action
  }

  /**
   * @description w-table context
   */
  interface Context {
    tableId: string

    tableRef: Ref<any>

    tableProps: ComputedRef<Props>

    tableHeaders: Ref<Header.Item.Props[]>

    tableEvent: (val: Params.Entry) => void

    tablePageState: {
      total: number
      pageNum: number
      pageSize: number
    }
  }

  /**
   * @description w-table props
   */
  type Props<T = any> = Partial<
    ElTable.ElTableProps<T> & {
      /**
       * @description w-table headers
       */
      headers: Header.Item.Props<T>[]

      /**
       * @description w-table, pagination or not
       */
      hasPage: boolean

      /**
       * @description w-table settings or not
       */
      hasSettings: boolean

      /**
       * @description w-table total count, used for pagination
       */
      total: number

      /**
       * @description w-table page number, used for pagination
       */
      pageNum: number

      /**
       * @description w-table current page, used for pagination
       */
      pageSize: number

      /**
       * @description
       *   Notice that the emit event common usage is @event="onEvent"
       *   But vue inside also handle event as a prop which start with `on`
       *   And capitalize the first event like `onEvent`
       *   So the props below is just a type support for coding
       *   There will not be any actually code declares these events which are the same usage as props
       *
       * @example Below two lines work the same result
       * <w-table @action="onAction" />
       * <w-table :onAction="onAction" />
       */
      onAction: Event.Action<T>
      onEdit: Event.Edit<T>
      onPage: Event.Page
    }
  >

  /**
   * @description w-table header
   */
  namespace Header {
    /**
     * @description el-table-column props, just make typing more spcific
     */
    namespace Default {
      /**
       * @description custom original column type
       * Just a little trick to index/selection/expand column
       */
      type DefaultCustom<T, P, D> = ElTable.ElTableColumnProps<D> &
        P & {
          /**
           * @description custom column type
           */
          type: T
        }

      type Expand<D = any> = DefaultCustom<'expand', {}, D>
      type Index<D = any> = DefaultCustom<
        'index',
        {
          index: number | ((index: number) => number)
        },
        D
      >
      type Selection<D = any> = DefaultCustom<
        'selection',
        {
          selectable: (row: Recordable, index: number) => boolean
          reserveSelection: boolean
        },
        D
      >

      // entry
      type Props<T = any> = Expand<T> | Index<T> | Selection<T>
    }

    /**
     * @description w-table extend column like `Action`/`Editable` etc.
     */
    namespace Extend {
      namespace Action {
        type Type = 'array' | 'slot'
        type Config = 'create' | 'edit' | 'delete'
        type Group = WButtonGroupItem & {
          actionButtonType?: Config
        }

        // entry
        interface Props {
          actionType: Type
          actionConfig: Config[]
          actionButtonGroup: Group[]
        }
      }

      namespace Editable {
        /**
         * @description custom editable column type
         */
        type EditableCustom<T, P> = {
          editType: T
          editTypeComponentProps: P
        }

        type Input = EditableCustom<'input', WInputProps>
        type InputNumber = EditableCustom<'inputNumber', WInputNumberProps>
        type Select = EditableCustom<'select', WSelectProps>
        type Switch = EditableCustom<'switch', SwitchProps>
        type SwitchProps = Omit<WSwitchProps, 'beforeChange'> & {
          beforeChange: (val: Params.Edit) => Promise<boolean> | boolean
        }

        // entry
        type Props = Input | InputNumber | Select | Switch
      }
    }

    /**
     * @description w-table header item entry
     * @example const headers: WTable.Header.Item.Props[] = []
     */
    namespace Item {
      /**
       * @description custom w-table column type
       */
      type HeaderItemCustom<T, P, D> = {
        /**
         * @description generaic type
         */
        type?: T

        /**
         * @description column visibility
         */
        visible?: boolean

        /**
         * @description Original el-table-column props, support different type different props.
         * Only specific `type` column have its own types. Same structure for action and editable column.
         * @example type: 'index' => componentProps: { index: () => {} }
         * @example type: 'selection' => componentProps: { selectable: () => {} }
         * @example type: 'expand' => componentProps: {  }
         */
        columnProps?: Partial<Header.Default.Props<D>>

        /**
         * @description Custom props for different type
         */
        componentProps?: Partial<P>
      }

      type Types =
        | 'default'
        | 'action'
        | 'editable'
        | 'slot'
        | 'render'
        | 'nested'

      type Default<D = any> = HeaderItemCustom<
        'default' | '',
        {
          copy?: boolean
        },
        D
      >

      type Action<D = any> = HeaderItemCustom<
        'action',
        Header.Extend.Action.Props,
        D
      >
      type Editable<D = any> = HeaderItemCustom<
        'editable',
        Header.Extend.Editable.Props,
        D
      >

      type Slot<D = any> = HeaderItemCustom<'slot', {}, D>

      type Render<D = any> = HeaderItemCustom<
        'render',
        {
          render: (cb: ElTable.SlotData) => VNode | VNode[] | string
        },
        D
      >

      type Nested<D = any> = HeaderItemCustom<'nested', {}, D>

      // entry
      type Props<T = any> = TreeDataItem<
        Default<T> | Action<T> | Editable<T> | Slot<T> | Render<T> | Nested<T>
      >
    }
  }
}
