import type { ElTreeRef } from './ref'

/**
 * @description Below three comment out methods doesn't appear in original ElTreeRef.
 * So I add an extra type to extend it from ElTreeMethods
 */
type ElTreeMethodsField =
  | 'filter'
  // | 'updateKeyChildren'
  | 'setChecked'
  | 'getHalfCheckedNodes'
  | 'getHalfCheckedKeys'
  | 'setCheckedNodes'
  | 'getCheckedNodes'
  | 'setCheckedKeys'
  | 'getCheckedKeys'
  // | 'setCurrentKey'
  // | 'getCurrentKey'
  | 'setCurrentNode'
  | 'getCurrentNode'
  | 'getNode'
  | 'remove'
  | 'append'
  | 'insertBefore'
  | 'insertAfter'

type ExtraElTreeMethods = {
  updateKeyChildren: (key: any, data: any[]) => void
  setCurrentKey: (key: any) => void
  getCurrentKey: Fn
}

/**
 * @description https://element-plus.gitee.io/#/zh-CN/component/tree#fang-fa
 * Pick type from ref
 */
export type ElTreeMethods = Pick<ElTreeRef, ElTreeMethodsField> &
  ExtraElTreeMethods
