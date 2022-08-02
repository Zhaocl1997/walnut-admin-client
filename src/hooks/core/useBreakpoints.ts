import {
  breakpointsTailwind,
  useBreakpoints as VueUseBreakpoints,
} from '@vueuse/core'

export const useAppBreakpoints = () => {
  return VueUseBreakpoints(breakpointsTailwind)
}
