import type { ComputedRef } from 'vue'
import type { WTreeProps } from '../types'

export const useTreeSingle = (
  props: WTreeProps,
  emit: Fn,
  nodeKey: ComputedRef
) => {
  // single
  const onNodeClick = (data: any, node: any, arr: any[]) => {
    if (props.multiple) {
      return
    }

    emit('update:modelValue', data[nodeKey.value])
    emit('node-click', data, node, arr)
  }

  return { onNodeClick }
}
