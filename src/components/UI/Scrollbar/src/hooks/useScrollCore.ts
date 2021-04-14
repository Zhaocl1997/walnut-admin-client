import type {
  WScrollbarRef,
  ScrollToAdvancedParams,
  WScrollProps,
} from '../types'
import { nextTick } from 'vue'

import { ScrollModeEnum, ScrollFieldEnum } from '../types'
import { useScrollTo } from '../hooks/useScrollTo'

const defaultDurationTime = 500

export const useScrollCore = (
  props: WScrollProps,
  getScrollRef: Fn
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
    const { scrollbar } = getScrollRef()

    nextTick(() => {
      const { start } = useScrollTo({
        el: scrollbar.wrap,
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
    const { scrollbar } = getScrollRef()

    const val = props.vertical
      ? scrollbar.wrap.scrollWidth
      : scrollbar.wrap.scrollHeight

    scrollTo(val, duration)
  }

  /**
   * @description scroll to top
   */
  const scrollToAdvanced = (
    args: ScrollToAdvancedParams,
    duration?: number
  ) => {
    const { scrollbar } = getScrollRef()

    const { index } = args

    let val: any

    try {
      val = scrollbar.wrap.children[0].children[index!][field]
    } catch (e) {
      val = scrollbar.wrap.children[0].children[0].children[index!][field]
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
