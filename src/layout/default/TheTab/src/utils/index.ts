import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { AppTab } from '../types'

/**
 * @description Calc the index to scroll to
 */
export const calcIndex = (index: number) => {
  // to keep current tab close to center
  if (index > 5) {
    return index - 4
  }

  // first ten tabs just don't scroll anyway
  if (index < 10) {
    return 0
  }

  return index
}

/**
 * @description Build the tab based on route
 */
export const createTab = (route: RouteLocationNormalizedLoaded): AppTab => {
  return {
    name: route.name as string,
    path: route.path,
    meta: route.meta,
  }
}
