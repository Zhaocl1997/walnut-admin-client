import type { ComponentInternalInstance, VNode } from 'vue'
import type { ElTreeMethods } from './methods'

import { h as VueH } from 'vue'

export type TreeNode = {
  id: number
  text: string
  checked: boolean
  indeterminate: boolean
  data: TreeNodeData
  expanded: boolean
  parent: TreeNode
  visible: boolean
  isCurrent: boolean
  store: ElTreeRef
  isLeafByUser: boolean
  isLeaf: boolean
  canFocus: boolean

  level: number
  loaded: boolean
  childNodes: TreeNode[]
  loading: boolean
}
export type TreeKey = StringOrNumber
export type TreeData = TreeNodeData[]
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeStoreNodesMap {
  [key: string]: TreeNode
}

export type LoadFunction = (
  rootNode: TreeNode,
  loadedCallback: (data: TreeData) => void
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

export type FilterNodeMethodFunction = (
  value: any,
  data: TreeNodeData,
  child: TreeNode
) => boolean

/**
 * @description el-tree ref typing
 */
export interface ElTreeRef extends ElTreeMethods {
  currentNode: TreeNode
  currentNodeKey: TreeKey
  nodesMap: TreeStoreNodesMap
  root: TreeNode
  data: TreeData
  lazy: boolean
  load: LoadFunction
  filterNodeMethod: FilterNodeMethodFunction
  key: TreeKey
  defaultCheckedKeys: TreeKey[]
  checkStrictly: boolean
  defaultExpandedKeys: TreeKey[]
  autoExpandParent: boolean
  defaultExpandAll: boolean
  checkDescendants: boolean
}
