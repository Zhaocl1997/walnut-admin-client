import type { ComputedRef } from 'vue'
import type { TabsContext } from '../types/tabsContext'

interface useTabsMethodsParams extends Pick<TabsContext, 'scrollRef'> {
  currentRouteTabIndex: ComputedRef<number>
}

export const useTabsMethods = (params: useTabsMethodsParams) => {
  const { scrollRef, currentRouteTabIndex } = params

  const leftMethods = {
    onScrollToStart: () => {
      scrollRef.value!.scrollToStart()
    },

    onScrollToCurrent: () => {
      scrollRef.value!.scrollToAdvanced({ index: currentRouteTabIndex.value })
    },
  }

  const rightMethods = {
    onScrollToEnd: () => {
      scrollRef.value!.scrollToEnd()
    },
  }

  return {
    leftMethods,
    rightMethods,
  }
}
