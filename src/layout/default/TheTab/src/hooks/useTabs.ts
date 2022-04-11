import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

import { onLeaveRoomForTabs, createTab } from '../utils'
import { buildTabs } from '/@/core/tab'

/**
 * @description App Tab Core Function
 */
export const useTabs = () => {
  const { appMemo, tab } = useAppState()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<WScrollbarRef>>(null)

  const getCurrentRouteTabIndex = computed(() =>
    tab.value.tabs.findIndex((item) => item.name === currentRoute.value.name)
  )

  const onScrollToCurrentTab = () => {
    // scroll by index
    nextTick(() => {
      // If is mobile, just scroll to current route tab index
      scrollRef.value?.scrollToIndex(
        appMemo.value.isMobile
          ? getCurrentRouteTabIndex.value
          : onLeaveRoomForTabs(getCurrentRouteTabIndex.value)
      )
    })
  }

  watchEffect(
    () => {
      // Build tab
      buildTabs(createTab(route))

      // Scroll
      // Trick to trigger the scroll
      appMemo.value.device && onScrollToCurrentTab()
    },
    // need to set sync otherwise when toggle header visible, it will cause recursive error
    { flush: 'sync' }
  )

  return { scrollRef, getCurrentRouteTabIndex }
}
