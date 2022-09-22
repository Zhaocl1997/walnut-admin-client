import type { WScrollbarInst } from '@/components/Extra/Scrollbar'

/**
 * @description App Tab Core Function
 */
export const useTabs = () => {
  const appTab = useAppStoreTab()
  const appAdapter = useAppStoreAdapter()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<WScrollbarInst>>(null)
  const isOverflow = ref(false)

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

      // use device to trigger Scroll
      appAdapter.device && onScrollToCurrentTab()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  watch(
    () => appTab.tabs,
    () => {
      // check scroll content is overflow or not, do some judgement
      isOverflow.value = scrollRef.value?.getIsOverflow()!
    },
    {
      deep: true,
      immediate: true,
      flush: 'post',
    }
  )

  return { scrollRef, isOverflow, getCurrentRouteTabIndex }
}
