import type { WScrollProps } from '../types'

import { useDebounceFn } from '@vueuse/shared'

export const useScrollPosition = (props: WScrollProps, emit: Fn) => {
  const onScroll = ({
    scrollLeft,
    scrollTop,
  }: {
    scrollLeft: number
    scrollTop: number
  }) => {
    if (props.vertical) {
      emit('update:modelValue', Math.ceil(scrollLeft))
    } else {
      emit('update:modelValue', Math.ceil(scrollTop))
    }
  }

  return {
    onScroll: useDebounceFn(onScroll, 200),
  }
}
