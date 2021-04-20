import {
  breakpointsTailwind,
  useBreakpoints as VueUseBreakpoints,
} from '@vueuse/core'

export const useBreakpoints = () => {
  return VueUseBreakpoints(breakpointsTailwind)
}
