import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

import { onLeaveRoomForTabs, createTab } from '../utils'
import { tabActionCreate } from '/@/store/actions/tabs'

/**
 * @description App Tab Core Function
 */
export const useTabs = () => {
  const { app, tab } = useAppState()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<WScrollbarRef>>(null)

  const getCurrentRouteTabIndex = computed(() =>
    tab.tabs.findIndex((item) => item.name === currentRoute.value.name)
  )

  const onScrollToCurrentTab = () => {
    // scroll by index
    nextTick(() => {
      // If is mobile, just scroll to current route tab index
      scrollRef.value?.scrollToIndex(
        app.value.isMobile
          ? getCurrentRouteTabIndex.value
          : onLeaveRoomForTabs(getCurrentRouteTabIndex.value)
      )
    })
  }

  watchEffect(
    () => {
      // Build tab
      tabActionCreate(createTab(route))

      // Scroll
      // Trick to trigger the scroll
      app.value.device && onScrollToCurrentTab()
    },
    // This is important
    // If no flush: 'post', this effect will trigger in instance for the first time which cause an null error.
    // With flush: 'post', make sure triggered not in a instance
    // You can try comment out thie line and see the error
    { flush: 'post' }
  )

  return { scrollRef, getCurrentRouteTabIndex }
}
