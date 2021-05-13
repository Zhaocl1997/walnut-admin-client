import type { TreeKey, WTreeProps } from './index'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/tree#fang-fa
 */
export interface ElTreeMethods<T = any> {
  filter: (val: any) => void
  updateKeyChildren: (key: TreeKey, data: TreeData<T>) => void
  getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => any[]
  setCheckedNodes: (nodes: any[]) => void
  getCheckedKeys: (leafOnly?: boolean) => TreeKey[]
  setCheckedKeys: (keys: any[], leafOnly?: boolean) => void
  setChecked: (data: any, checked: boolean, deep?: boolean) => void
  getHalfCheckedNodes: () => any[]
  getHalfCheckedKeys: () => any[]
  getCurrentKey: () => Nullable<TreeKey>
  getCurrentNode: () => Nullable<any>
  setCurrentKey: (
    key: Nullable<TreeKey>,
    shouldAutoExpandParent?: boolean
  ) => void
  setCurrentNode: (node: any, shouldAutoExpandParent?: boolean) => void
  getNode: (data: any) => any
  remove: (data: any) => void
  append: (data: any, node: any) => void
  insertBefore: (data: any, refNode: any) => void
  insertAfter: (data: any, refNode: any) => void
}

/**
 * @description extend from `ElTreeMethods`
 */
export interface WTreeMethods {
  expandAll: (val: boolean) => void
  checkAll: (val: boolean) => void
}

export type WTreeSetProps = (newProps: WTreeProps<any>) => void

export type WTreeExposedMethods<T = any> = ElTreeMethods<T> &
  WTreeMethods & { setProps: WTreeSetProps }
