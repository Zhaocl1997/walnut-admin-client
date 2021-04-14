import type { WTreeProps } from '../types'

import { nextTick } from 'vue'

export const useTreeMultiple = (
  props: WTreeProps,
  emit: Fn,
  onGetCheckedNodes: Fn
) => {
  // multiple
  const onCheck = (data: any, params: any) => {
    if (!props.multiple) {
      return
    }

    nextTick(() => {
      const ret = onGetCheckedNodes()

      emit('update:modelValue', ret)
      emit('check', data, params)
    })
  }

  return { onCheck }
}
