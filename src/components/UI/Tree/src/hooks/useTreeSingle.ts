import { ComputedRef } from '@vue/reactivity'
import type { WTreeProps } from '../types'

export const useTreeSingle = (
  props: ComputedRef<WTreeProps>,
  emit: Record<string, Fn>
) => {
  // single
  const onNodeClick = (data: any, node: any, arr: any[]) => {
    if (props.value.multiple) {
      return
    }

    emit.emitModelValue(data[props.value.props!.id!])
    emit.emitNodeClick(data, node, arr)
  }

  return { onNodeClick }
}
