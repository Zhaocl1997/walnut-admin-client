import type { ComputedRef, Ref } from 'vue'
import type {
  WTreeProps,
  ElTreeRef,
  ElTreeMethods,
  WTreeMethods,
  WTreeSetProps,
} from '../types'

import { nextTick } from 'vue'

/**
 * @description expose ElTree methods to outside
 */
export const useTreeMethods = (
  props: ComputedRef<WTreeProps>,
  treeRef: Ref<Nullable<ElTreeRef>>,
  emit: Record<string, Fn>,
  onGetCheckedNodes: Fn,
  setProps: WTreeSetProps
) => {
  // Original ElTree methods
  const elTreeMethods: ElTreeMethods = {
    filter: (value) => {
      treeRef.value!.filter(value)
    },

    updateKeyChildren: (key, data) => {
      treeRef.value!.updateKeyChildren(key, data)
    },

    setChecked: (data, checked, deep) => {
      treeRef.value!.setChecked(data, checked, deep)
    },

    getHalfCheckedNodes: () => {
      return treeRef.value!.getHalfCheckedNodes()
    },

    getHalfCheckedKeys: () => {
      return treeRef.value!.getHalfCheckedKeys()
    },

    setCheckedNodes: (nodes) => {
      treeRef.value!.setCheckedNodes(nodes)
    },

    getCheckedNodes: (
      leafOnly = props.value.leafOnly as boolean,
      includeHalfChecked = props.value.includeHalfChecked as boolean
    ) => {
      return treeRef.value!.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    setCheckedKeys: (keys, leafOnly = props.value.leafOnly as boolean) => {
      treeRef.value!.setCheckedKeys(keys, leafOnly)
    },

    getCheckedKeys: () => {
      return treeRef.value!.getCheckedKeys()
    },

    setCurrentKey: (key) => {
      treeRef.value!.setCurrentKey(key)
    },

    getCurrentKey: () => {
      return treeRef.value!.getCurrentKey()
    },

    setCurrentNode: (currentNode) => {
      treeRef.value!.setCurrentNode(currentNode)
    },

    getCurrentNode: () => {
      return treeRef.value!.getCurrentNode()
    },

    getNode: (data) => {
      return treeRef.value!.getNode(data)
    },

    remove: (data) => {
      treeRef.value!.remove(data)
    },

    append: (data, parentData) => {
      treeRef.value!.append(data, parentData)
    },

    insertBefore: (data, refData) => {
      treeRef.value!.insertBefore(data, refData)
    },

    insertAfter: (data, refData) => {
      treeRef.value!.insertAfter(data, refData)
    },
  }

  // Extend methods
  const extendMethods: WTreeMethods = {
    /**
     * @description Expand all nodes
     */
    expandAll: (val) => {
      const nodes = (treeRef.value! as any).store.nodesMap
      for (const i in nodes) {
        nodes[i].expanded = val
      }
    },

    /**
     * @description Check all nodes
     */
    checkAll: (val) => {
      if (!props.value.multiple) {
        return
      }

      if (val) {
        treeRef.value!.setCheckedNodes(props.value.data as any)

        nextTick(() => {
          const ret = onGetCheckedNodes()

          emit.emitModelValue(ret)
        })
      } else {
        treeRef.value!.setCheckedKeys([])

        emit.emitModelValue([])
      }
    },
  }

  const treeMethods = {
    ...elTreeMethods,
    ...extendMethods,
    setProps: setProps,
  }

  return { treeMethods }
}
