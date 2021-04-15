import { nextTick, onMounted, onUnmounted } from 'vue'
import {
  useBreakpoints,
  breakpointsTailwind,
  useThrottleFn,
  useEventListener,
} from '@vueuse/core'

import { useAppStore } from '/@/store'

export const useWindowResize = () => {
  const { dispatch } = useAppStore()

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const changeMenuState = () => {
    if (breakpoints.isSmaller('lg')) {
      dispatch('app/commitMenuCollapse', true)
    } else {
      dispatch('app/commitMenuCollapse', false)
    }
  }

  const handler = useThrottleFn(changeMenuState, 500)

  useEventListener(window, 'resize', handler)
}
