import type {
  TreeData,
  TreeKey,
  LoadFunction,
  FilterNodeMethodFunction,
  RenderContentFunction,
  AllowDragFunction,
  AllowDropFunction,
} from './ref'

import type { WTreePropsOptions } from './index'

/**
 * @link https://element-plus.org/#/zh-CN/component/tree#attributes
 */
interface ElTreeProps {
  data: TreeData
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
  load: LoadFunction
  filterNodeMethod: FilterNodeMethodFunction
  accordion: boolean
  indent: number
  iconClass: string
}

export interface WTreeProps<D = Recordable> extends Partial<ElTreeProps> {
  /**
   * @override
   */
  props?: WTreePropsOptions<D>

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
  multiple?: boolean

  /**
   * @description used for multiple change, if only need leaf node, default false
   * @type {Boolean}
   * @default false
   */
  leafOnly?: boolean

  /**
   * @description used for multiple change, if include half checked node, default false
   * @type {Boolean}
   * @default false
   */
  includeHalfChecked?: boolean
}
