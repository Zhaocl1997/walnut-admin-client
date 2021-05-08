import type { WScrollProps, ElScrollbarRef } from '../types'
import type { Ref } from 'vue'

import { ref, nextTick } from 'vue'

import { genString } from 'easy-fns-ts'

import { useEventListener } from '@vueuse/core'

export const useVerticalScroll = (
  props: WScrollProps,
  scrollRef: Ref<Nullable<ElScrollbarRef>>,
  emit: Fn
) => {
  const scrollId = ref(genString(8))

  /**
   * @description Capture wheel event so be able to handle x axias scroll
   */
  const onScroll = (event: WheelEvent) => {
    // get scroll direction
    const detail = (event as any).wheelDelta || event.detail

    // define direction
    const moveForwardStep = 1
    const moveBackStep = -1

    // define step
    let step = 0

    // nagative means scroll to right, positive means scroll to left
    if (detail < 0) {
      step = moveForwardStep * 100
    } else {
      step = moveBackStep * 100
    }

    // move action
    scrollRef.value!.wrap.scrollLeft += step

    emit('scroll')
  }

  nextTick(() => {
    if (props.vertical) {
      const target = document.getElementById(scrollId.value)!

      useEventListener(target, 'wheel', onScroll, {
        passive: true,
        once: false,
        capture: true,
      })
    }
  })

  return {
    scrollId,
  }
}
