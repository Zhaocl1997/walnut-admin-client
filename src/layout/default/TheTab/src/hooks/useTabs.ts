import type { ICompExtraScrollbarInst } from '@/components/Extra/Scrollbar'

/**
 * @description App Tab Core Function
 */
export function useTabs() {
  const appTab = useAppStoreTab()
  const appAdapter = useAppStoreAdapter()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<ICompExtraScrollbarInst>>(null)
  const isOverflow = ref(false)

  const getCurrentRouteTabIndex = computed(() =>
    appTab.tabs.findIndex(item => item.name === currentRoute.value.name),
  )

  const onScrollToCurrentTab = async () => {
    await nextTick()

    // scroll by index
    // If is mobile, just scroll to current route tab index
    scrollRef.value?.scrollToIndex(
      appAdapter.isMobile
        ? getCurrentRouteTabIndex.value
        : appTab.leaveRoomForTabs(getCurrentRouteTabIndex.value),
    )
  }

  const onUpdateOverflow = () => {
    isOverflow.value = scrollRef.value?.getIsOverflow() as boolean
  }

  watch(
    route,
    async () => {
      // Build tab
      appTab.createTabs(appTab.createTabByRoute(route))

      // use device to trigger Scroll
      appAdapter.device && await onScrollToCurrentTab()
    },
    {
      immediate: true,
      deep: true,
    },
  )

  watch(
    () => appTab.tabs,
    async () => {
      await nextTick()
      onUpdateOverflow()
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return {
    scrollRef,
    isOverflow,
    onUpdateOverflow,
    onScrollToCurrentTab,
  }
}
