import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const useAppBreakpoints = () => {
  return useBreakpoints(breakpointsTailwind)
}
