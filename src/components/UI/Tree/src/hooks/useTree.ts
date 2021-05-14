/* eslint-disable */
import type { WTreeExposedMethods, WTreeProps } from '../types'

import { ref, watchEffect } from 'vue'

import { isInSetup } from '/@/utils/shared'

export const useTree = <T>(props?: WTreeProps<T>) => {
  isInSetup()

  const treeRef = ref<Nullable<WTreeExposedMethods<T>>>(null)

  const register = (instance: WTreeExposedMethods<T>) => {
    treeRef.value = instance

    watchEffect(() => {
      props && instance.setProps!(props)
    })
  }

  const methods: Omit<WTreeExposedMethods<T>, 'setProps'> = {
    filter: (...args) => treeRef.value?.filter(...args),
    updateKeyChildren: (...args) => treeRef.value?.updateKeyChildren(...args),
    getCheckedNodes: (...args) => treeRef.value?.getCheckedNodes(...args)!,
    setCheckedNodes: (...args) => treeRef.value?.setCheckedNodes(...args),
    getCheckedKeys: (...args) => treeRef.value?.getCheckedKeys(...args)!,
    setCheckedKeys: (...args) => treeRef.value?.setCheckedKeys(...args),
    setChecked: (...args) => treeRef.value?.setChecked(...args),
    getHalfCheckedNodes: (...args) =>
      treeRef.value?.getHalfCheckedNodes(...args)!,
    getHalfCheckedKeys: (...args) =>
      treeRef.value?.getHalfCheckedKeys(...args)!,
    getCurrentKey: (...args) => treeRef.value?.getCurrentKey(...args)!,
    getCurrentNode: (...args) => treeRef.value?.getCurrentNode(...args)!,
    setCurrentKey: (...args) => treeRef.value?.setCurrentKey(...args),
    setCurrentNode: (...args) => treeRef.value?.setCurrentNode(...args),
    getNode: (...args) => treeRef.value?.getNode(...args)!,
    remove: (...args) => treeRef.value?.remove(...args),
    append: (...args) => treeRef.value?.append(...args),
    insertBefore: (...args) => treeRef.value?.insertBefore(...args),
    insertAfter: (...args) => treeRef.value?.insertAfter(...args),
    checkAll: (...args) => treeRef.value?.checkAll(...args),
    expandAll: (...args) => treeRef.value?.expandAll(...args),
  }

  return [register, methods] as const
}
