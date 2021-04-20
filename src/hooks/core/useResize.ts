import { useThrottleFn, useEventListener } from '@vueuse/core'

export const useResize = (fn: Fn, throttle = 200) => {
  const handler = useThrottleFn(fn, throttle)

  useEventListener(window, 'resize', handler)
}
