import type { ComputedRef } from 'vue'

import type { WTreeProps } from '../types'

import { nextTick } from 'vue'

export const useTreeMultiple = (
  props: ComputedRef<WTreeProps>,
  emit: Record<string, Fn>,
  onGetCheckedNodes: Fn
) => {
  // multiple
  const onCheck = (data: any, params: any) => {
    if (!props.value.multiple) {
      return
    }

    nextTick(() => {
      const ret = onGetCheckedNodes()

      emit.emitModelValue(ret)
      emit.emitCheck(data, params)
    })
  }

  return { onCheck }
}
