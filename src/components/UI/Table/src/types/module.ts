import type { ComputedRef, Ref, VNode } from 'vue'

import type { WInputProps } from '../../../Input'
import type { WInputNumberProps } from '../../../InputNumber'
import type { WSelectProps } from '../../../Select'
import type { WSwitchProps } from '../../../Switch'
import type { WButtonGroupItem } from '../../../ButtonGroup'

import type { ElTableProps, ElTableColumnProps } from './elTable'

export declare namespace WTable {
  /**
   * @description custom editable column type
   */
  type EditableCustom<T, P> = {
    editType: T
    editTypeComponentProps: P
  }

  /**
   * @description custom original column type
   * Just a little trick to index/selection/expand column
   */
  type DefaultCustom<T, P, D> = ElTableColumnProps<D> &
    P & {
      /**
       * @description custom column type
       */
      type: T
    }

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

  /**
   * @description refer to `edit` event params on `w-table`
   * 1. newValue: the new value user just edited
   * 2. row: refer to `ElTableColumnScopedSlot` row type
   * 3. prop: refer to `WTableHeaderItem` prop field
   * 4. loadStart: start the loading meanually
   * 5. loadEnd: end the loading meanually
   */
  interface EditableChangeParams<T = any> {
    newValue: any
    row: T
    prop: string
    loadStart: Fn
    loadEnd: Fn
  }

  interface PageChangeParams {
    pageNum: number
    pageSize: number
  }

  /**
   * @description w-table event entry
   */
  export namespace Event {
    type EventsCustom<E, P> = {
      eventName: E
      eventParams: P
    }

    export type Action = EventsCustom<
      'action',
      { type: Header.Extend.Action.Config; scope: ScopeSlotData }
    >

    export type Edit = EventsCustom<'edit', { val: EditableChangeParams }>

    export type Entry = Action | Edit
  }

  /**
   * @description w-table pagination base fields
   */
  export interface PaginationFields {
    total: number
    pageNum: number
    pageSize: number
  }

  export interface Context {
    tableProps: ComputedRef<Props>

    tableHeaders: Ref<Header.Item.Props[]>

    tableRef: Ref<any>

    tableEvent: (val: Event.Entry) => void

    tableId: string

    /**
     * @description w-table emit events
     * Provide these events on the top of the root vue file
     * And we can call it via context in children's components
     * Very convenient
     */
    emitEvents: {
      // type for action event
      action: (type: Header.Extend.Action.Config, scope: ScopeSlotData) => void

      // type for edit event
      edit: (val: EditableChangeParams) => void

      // type for page event
      page: (val: PageChangeParams) => void
    }
  }

  /**
   * @description w-table props
   */
  export type Props<T = any> = Partial<
    ElTableProps & {
      /**
       * @description w-table headers
       */
      headers: Header.Item.Props[]

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
      onAction: (
        type: Header.Extend.Action.Config,
        scope: ScopeSlotData<T>
      ) => void
      onEdit: (val: EditableChangeParams<T>) => void
      onPage: (val: PageChangeParams) => void
    }
  >

  /**
   * @link https://element-plus.gitee.io/#/zh-CN/component/table#table-column-scoped-slot
   * @description el-table-column default slot data
   */
  export interface ScopeSlotData<T = any> extends AnyObject {
    column: any
    row: T
    $index: number | string
  }

  /**
   * @description w-table header main
   */
  export namespace Header {
    /**
     * @description el-table-column props, just make typing more spcific
     */
    export namespace Default {
      export type Expand<D = any> = DefaultCustom<'expand', {}, D>
      export type Index<D = any> = DefaultCustom<
        'index',
        {
          index: number | ((index: number) => number)
        },
        D
      >
      export type Selection<D = any> = DefaultCustom<
        'selection',
        {
          selectable: (row: Recordable, index: number) => boolean
          reserveSelection: boolean
        },
        D
      >

      // entry
      export type Props<T = any> = Expand<T> | Index<T> | Selection<T>
    }

    /**
     * @description w-table extend column like `Action`/`Editable` etc.
     */
    export namespace Extend {
      export namespace Action {
        export type Type = 'array' | 'slot'
        export type Config = 'create' | 'edit' | 'delete'
        export type Group = WButtonGroupItem & {
          actionButtonType?: Config
        }

        // entry
        export interface Props {
          actionType: Type
          actionConfig: Config[]
          actionButtonGroup: Group[]
        }
      }

      export namespace Editable {
        export type Input = EditableCustom<'input', WInputProps>
        export type InputNumber = EditableCustom<
          'inputNumber',
          WInputNumberProps
        >
        export type Select = EditableCustom<'select', WSelectProps>
        export type Switch = EditableCustom<'switch', SwitchProps>
        export type SwitchProps = Omit<WSwitchProps, 'beforeChange'> & {
          beforeChange: (
            val: EditableChangeParams
          ) => Promise<boolean> | boolean
        }

        // entry
        export type Props = Input | InputNumber | Select | Switch
      }
    }

    /**
     * @description w-table header item entry
     * @example const headers: WTable.Header.Item.Props[] = []
     */
    export namespace Item {
      export type Types =
        | 'default'
        | 'action'
        | 'editable'
        | 'slot'
        | 'render'
        | 'nested'

      export type Default<D = any> = HeaderItemCustom<'default', {}, D>

      export type Action<D = any> = HeaderItemCustom<
        'action',
        Header.Extend.Action.Props,
        D
      >
      export type Editable<D = any> = HeaderItemCustom<
        'editable',
        Header.Extend.Editable.Props,
        D
      >

      export type Slot<D = any> = HeaderItemCustom<'slot', {}, D>

      export type Render<D = any> = HeaderItemCustom<
        'render',
        {
          render: (cb: ScopeSlotData) => VNode | VNode[] | string
        },
        D
      >

      export type Nested<D = any> = HeaderItemCustom<'nested', {}, D>

      // entry
      export type Props<T = any> = TreeDataItem<
        Default<T> | Action<T> | Editable<T> | Slot<T> | Render<T> | Nested<T>
      >
    }
  }
}
