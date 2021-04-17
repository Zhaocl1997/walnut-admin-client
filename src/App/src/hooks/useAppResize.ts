import {
  useBreakpoints,
  breakpointsTailwind,
  useThrottleFn,
  useEventListener,
} from '@vueuse/core'

export const useAppResize = (fn: Fn) => {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const handler = useThrottleFn(fn, 500)

  useEventListener(window, 'resize', handler)

  return { breakpoints }
}
