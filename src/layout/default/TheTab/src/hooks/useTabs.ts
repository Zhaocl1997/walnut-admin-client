import type { WScrollbarInst } from '/@/components/Extra/Scrollbar'

/**
 * @description App Tab Core Function
 */
export const useTabs = () => {
  const appTab = useAppTabStore()
  const appAdapter = useAppAdapterStore()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<WScrollbarInst>>(null)

  const getCurrentRouteTabIndex = computed(() =>
    appTab.tabs.findIndex((item) => item.name === currentRoute.value.name)
  )

  const onScrollToCurrentTab = () => {
    // scroll by index
    nextTick(() => {
      // If is mobile, just scroll to current route tab index
      scrollRef.value?.scrollToIndex(
        appAdapter.isMobile
          ? getCurrentRouteTabIndex.value
          : appTab.leaveRoomForTabs(getCurrentRouteTabIndex.value)
      )
    })
  }

  watch(
    route,
    () => {
      // Build tab
      appTab.createTabs(appTab.createTabByRoute(route))

      // Scroll
      appAdapter.device && onScrollToCurrentTab()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  return { scrollRef, getCurrentRouteTabIndex }
}
