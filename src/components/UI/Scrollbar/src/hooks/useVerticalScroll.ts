import type { WScrollProps } from '../types'
import { onMounted, onUnmounted, ref } from 'vue'
import { genString, off, on } from 'easy-fns-ts'

export const useVerticalScroll = (
  props: WScrollProps,
  getScrollRef: Fn,
  emit: Fn
) => {
  const scrollId = ref(genString(8))

  /**
   * @description Capture wheel event so be able to handle x axias scroll
   */
  const onScroll = (event: WheelEvent) => {
    const { scrollbar } = getScrollRef()

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
    scrollbar.wrap.scrollLeft += step

    emit('scroll')
  }

  onMounted(() => {
    if (props.vertical) {
      const target = document.getElementById(scrollId.value)!
      // @ts-ignore
      // TODO easy-fns-ts
      on(target, 'wheel', onScroll, {
        passive: true,
        once: false,
        capture: true,
      })
    }
  })

  onUnmounted(() => {
    if (props.vertical) {
      const target = document.getElementById(scrollId.value)!
      // @ts-ignore
      off(target, 'wheel', onScroll, false)
    }
  })

  return {
    scrollId,
  }
}
