import type { Ref } from 'vue'
import type { WTreeProps } from '../types'
import type { ElTreeMethods } from '../types/methods'

import { nextTick } from 'vue'

/**
 * @description expose ElTree methods to outside
 */
export const useTreeMethods = (
  treeRef: Ref<Nullable<ElTreeMethods>>,
  props: WTreeProps,
  emit: Fn,
  onGetCheckedNodes: Fn
) => {
  // Below is original ElTree methods
  const elTreeMethods = {
    filter: (value: any) => {
      treeRef.value!.filter(value)
    },

    updateKeyChildren: (key: any, data: any[]) => {
      treeRef.value!.updateKeyChildren(key, data)
    },

    setChecked: (data: any, checked: boolean, deep: boolean) => {
      treeRef.value!.setChecked(data, checked, deep)
    },

    getHalfCheckedNodes: () => {
      return treeRef.value!.getHalfCheckedNodes()
    },

    getHalfCheckedKeys: () => {
      return treeRef.value!.getHalfCheckedKeys()
    },

    setCheckedNodes: (array: any[], leafOnly = props.leafOnly) => {
      treeRef.value!.setCheckedNodes(array, leafOnly)
    },

    getCheckedNodes: (
      leafOnly = props.leafOnly,
      includeHalfChecked = props.includeHalfChecked
    ) => {
      return treeRef.value!.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    setCheckedKeys: (keys: any[], leafOnly = props.leafOnly) => {
      treeRef.value!.setCheckedKeys(keys, leafOnly)
    },

    getCheckedKeys: () => {
      return treeRef.value!.getCheckedKeys()
    },

    setCurrentKey: (key: any) => {
      treeRef.value!.setCurrentKey(key)
    },

    getCurrentKey: () => {
      return treeRef.value!.getCurrentKey()
    },

    setCurrentNode: (currentNode: any) => {
      treeRef.value!.setCurrentNode(currentNode)
    },

    getCurrentNode: () => {
      return treeRef.value!.getCurrentNode()
    },

    getNode: (data: any) => {
      return treeRef.value!.getNode(data)
    },

    remove: (data: any) => {
      treeRef.value!.remove(data)
    },

    append: (data: any, parentData: any) => {
      treeRef.value!.append(data, parentData)
    },

    insertBefore: (data: any, refData: any) => {
      treeRef.value!.insertBefore(data, refData)
    },

    insertAfter: (data: any, refData: any) => {
      treeRef.value!.insertAfter(data, refData)
    },
  }

  // Below is custom methods

  // expand all node
  const expandAll = (val: boolean) => {
    const nodes = (treeRef.value! as any).store.nodesMap
    for (const i in nodes) {
      nodes[i].expanded = val
    }
  }

  // check all node
  const checkAll = (val: boolean) => {
    if (!props.multiple) {
      return
    }

    if (val) {
      treeRef.value!.setCheckedNodes(props.data as any, props.leafOnly)

      nextTick(() => {
        const ret = onGetCheckedNodes()
        emit('update:modelValue', ret)
      })
    } else {
      treeRef.value!.setCheckedKeys([])

      emit('update:modelValue', [])
    }
  }

  const treeMethods = {
    ...elTreeMethods,
    expandAll,
    checkAll,
  }

  return { treeMethods }
}
