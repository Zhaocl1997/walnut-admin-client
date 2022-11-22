export const useAppScroll = () => {
  const { currentRoute } = useAppRouter()
  const appTab = useAppStoreTab()
  const userScroll = useAppStoreUserScroll()

  const showBackToTop = ref(true)

  const onScroll = useDebounceFn((e: Event) => {
    if (currentRoute.value.meta.position) {
      const top = (e.target as HTMLElement).scrollTop
      userScroll.setScrollTop(currentRoute.value.name! as string, top)
      appTab.setTabScrollTop(currentRoute.value.name! as string, top)
    }
  }, 250)

  watch(
    () => currentRoute.value.name,
    () => {
      showBackToTop.value = false
      setTimeout(() => {
        showBackToTop.value = true
      }, 1000)
    },
    {
      immediate: true,
    }
  )

  return {
    onscroll,
    showBackToTop,
  }
}
