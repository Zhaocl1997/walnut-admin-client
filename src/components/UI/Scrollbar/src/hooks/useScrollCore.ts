import type {
  WScrollbarRef,
  ScrollToAdvancedParams,
  WScrollProps,
  ElScrollbarRef,
} from '../types'
import type { Ref } from 'vue'

import { nextTick } from 'vue'

import { ScrollModeEnum, ScrollFieldEnum } from '../types'
import { useScrollTo } from '../hooks/useScrollTo'

const defaultDurationTime = 500

export const useScrollCore = (
  props: WScrollProps,
  scrollRef: Ref<Nullable<ElScrollbarRef>>
): WScrollbarRef => {
  const mode = props.vertical
    ? ScrollModeEnum.VERTICAL
    : ScrollModeEnum.HORIZONTAL

  const field = props.vertical
    ? ScrollFieldEnum.OFFSETLEFT
    : ScrollFieldEnum.OFFSETTOP

  /**
   * @description scroll to specfic position
   */
  const scrollTo = (to: number, duration: number = defaultDurationTime) => {
    nextTick(() => {
      const { start } = useScrollTo({
        el: scrollRef.value!.wrap,
        to,
        duration,
        mode,
      })
      start()
    })
  }

  /**
   * @description scroll to top
   */
  const scrollToStart = (duration?: number) => {
    scrollTo(0, duration)
  }

  /**
   * @description scroll to top
   */
  const scrollToEnd = (duration?: number) => {
    const val = props.vertical
      ? scrollRef.value!.wrap.scrollWidth
      : scrollRef.value!.wrap.scrollHeight

    scrollTo(val, duration)
  }

  /**
   * @description scroll to top
   */
  const scrollToAdvanced = (
    args: ScrollToAdvancedParams,
    duration?: number
  ) => {
    const { index } = args

    let val: any

    try {
      val = scrollRef.value!.wrap.children[0].children[index!][field]
    } catch (e) {
      val = scrollRef.value!.wrap.children[0].children[0].children[index!][
        field
      ]
    }

    scrollTo(val, duration)
  }

  return {
    scrollTo,
    scrollToStart,
    scrollToEnd,
    scrollToAdvanced,
  }
}
