import type { ComponentInternalInstance, VNode } from 'vue'
import type { ElTreeMethods } from './methods'

import { h as VueH } from 'vue'

/**
 * @description Tree node key, string or number
 */
export type TreeKey = StringOrNumber

/**
 * @description Tree node type, refactor from element-plus inside TreeNode type
 */
export type TreeNode<T = unknown> = {
  id: number
  text: string
  checked: boolean
  indeterminate: boolean
  data: TreeDataItem<T>
  expanded: boolean
  parent: TreeNode<T>
  visible: boolean
  isCurrent: boolean
  store: ElTreeRef<T>
  isLeafByUser: boolean
  isLeaf: boolean
  canFocus: boolean

  level: number
  loaded: boolean
  childNodes: TreeNode<T>[]
  loading: boolean
}
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeStoreNodesMap {
  [key: string]: TreeNode
}

export type LoadFunction<T> = (
  rootNode: TreeNode<T>,
  loadedCallback: (data: TreeDataItem<T>[]) => void
) => void

export type RenderContentFunction = (
  h: typeof VueH,
  context: RenderContentContext
) => VNode | VNode[]
export interface RenderContentContext {
  _self: ComponentInternalInstance
  node: TreeNode
  data: TreeNodeData
  store: TreeNode
}

export type AllowDragFunction = (node: TreeNode) => boolean
export type DropType = 'inner' | 'prev' | 'next'
export type AllowDropFunction = (
  draggingNode: TreeNode,
  dropNode: TreeNode,
  type: DropType
) => boolean

export type FilterNodeMethodFunction<T> = (
  value: any,
  data: TreeDataItem<T>,
  child: TreeNode
) => boolean

/**
 * @description el-tree ref typing
 */
export interface ElTreeRef<T = unknown> extends ElTreeMethods {
  currentNode: TreeNode<T>
  currentNodeKey: TreeKey
  nodesMap: TreeStoreNodesMap
  root: TreeNode
  data: TreeDataItem<T>[]
  lazy: boolean
  load: LoadFunction<T>
  filterNodeMethod: FilterNodeMethodFunction<T>
  key: TreeKey
  defaultCheckedKeys: TreeKey[]
  checkStrictly: boolean
  defaultExpandedKeys: TreeKey[]
  autoExpandParent: boolean
  defaultExpandAll: boolean
  checkDescendants: boolean
}
