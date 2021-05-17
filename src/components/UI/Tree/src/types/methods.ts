import type { TreeKey, WTreeProps } from './index'
import { TreeNode } from './ref'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/tree#fang-fa
 */
export interface ElTreeMethods<T = unknown> {
  filter: (val: any) => void

  updateKeyChildren: (key: TreeKey, data: TreeDataItem<T>[]) => void

  getCheckedNodes: (
    leafOnly?: boolean,
    includeHalfChecked?: boolean
  ) => TreeDataItem<T>[]

  setCheckedNodes: (nodes: Partial<TreeDataItem<T>>[]) => void

  getCheckedKeys: (leafOnly?: boolean) => TreeKey[]

  setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void

  setChecked: (
    data: TreeKey | Partial<TreeDataItem<T>>,
    checked: boolean,
    deep?: boolean
  ) => void

  getHalfCheckedNodes: () => TreeDataItem<T>[]

  getHalfCheckedKeys: () => TreeKey[]

  getCurrentKey: () => Nullable<TreeKey>

  getCurrentNode: () => Nullable<TreeDataItem<T>>

  setCurrentKey: (
    key: Nullable<TreeKey>,
    shouldAutoExpandParent?: boolean
  ) => void

  setCurrentNode: (
    node: Partial<TreeDataItem<T>>,
    shouldAutoExpandParent?: boolean
  ) => void

  getNode: (data: TreeKey | Partial<TreeDataItem<T>>) => TreeNode<T>

  remove: (data: TreeKey | Partial<TreeDataItem<T>>) => void

  append: (
    data: TreeDataItem<T>,
    node: TreeKey | Partial<TreeDataItem<T>>
  ) => void

  insertBefore: (
    data: TreeDataItem<T>,
    node: TreeKey | Partial<TreeDataItem<T>>
  ) => void

  insertAfter: (
    data: TreeDataItem<T>,
    node: TreeKey | Partial<TreeDataItem<T>>
  ) => void
}

/**
 * @description extend from `ElTreeMethods`
 */
export interface WTreeMethods {
  /**
   * @description expand tree
   */
  expandAll: (val: boolean) => void

  /**
   * @description check all tree nodes, only work for `multiple` is true
   */
  checkAll: (val: boolean) => void
}

export type WTreeSetProps<T = unknown> = (newProps: WTreeProps<T>) => void

/**
 * @description w-tree expose methods through ref
 */
export type WTreeExposedMethods<T = unknown> = ElTreeMethods<T> &
  WTreeMethods & { setProps: WTreeSetProps<T> }
