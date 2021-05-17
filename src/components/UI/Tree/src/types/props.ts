import type {
  TreeKey,
  LoadFunction,
  FilterNodeMethodFunction,
  RenderContentFunction,
  AllowDragFunction,
  AllowDropFunction,
} from './ref'

import type { WTreePropsOptions } from './index'
import type { MaybeRef } from '/~/utils'

/**
 * @link https://element-plus.org/#/zh-CN/component/tree#attributes
 */
interface ElTreeProps<T> {
  data: TreeDataItem<T>[]
  emptyText: string
  renderAfterExpand: boolean
  nodeKey: string
  checkStrictly: boolean
  expandOnClickNode: boolean
  defaultExpandAll: boolean
  checkOnClickNode: boolean
  checkDescendants: boolean
  autoExpandParent: boolean
  defaultCheckedKeys: TreeKey[]
  defaultExpandedKeys: TreeKey[]
  currentNodeKey: TreeKey
  renderContent: RenderContentFunction
  showCheckbox: boolean
  draggable: boolean
  allowDrag: AllowDragFunction
  allowDrop: AllowDropFunction
  // props: any
  lazy: boolean
  highlightCurrent: boolean
  load: LoadFunction<T>
  filterNodeMethod: FilterNodeMethodFunction<T>
  accordion: boolean
  indent: number
  iconClass: string
}

export interface WTreeProps<T = any> extends Partial<ElTreeProps<T>> {
  /**
   * @override
   */
  props?: WTreePropsOptions<T>

  /**
   * @override
   * @type {Boolean}
   * @default true
   */
  highlightCurrent?: boolean

  /**
   * @override
   * @type {Boolean}
   * @default false
   */
  expandOnClickNode?: boolean

  /**
   * @description v-model
   */
  modelValue?: TreeKey | TreeKey[]

  /**
   * @description multiple, also means for original show-checkbox
   * @type {Boolean}
   * @default false
   */
  multiple?: MaybeRef<boolean>

  /**
   * @description used for multiple change, if only need leaf node, default false
   * @type {Boolean}
   * @default false
   */
  leafOnly?: MaybeRef<boolean>

  /**
   * @description used for multiple change, if include half checked node, default false
   * @type {Boolean}
   * @default false
   */
  includeHalfChecked?: MaybeRef<boolean>
}
