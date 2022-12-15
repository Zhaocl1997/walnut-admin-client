export const useAppScroll = () => {
  const userScroll = useAppStoreUserScroll()

  const { currentRoute } = useAppRouter()

  const scrollWrapper = ref<HTMLElement>()
  const { x, y } = useScroll(scrollWrapper)

  debouncedWatch(
    () => [x.value, y.value] as const,
    ([x, y]) => {
      if (currentRoute.value.meta.position) {
        userScroll.setScrollPosition(currentRoute.value.name as string, y, x)
      }
    },
    { immediate: true, debounce: 200 }
  )

  watch(
    () => currentRoute.value.meta.position,
    (v) => {
      if (v) {
        const position = userScroll.getScrollPosition(
          currentRoute.value.name as string
        )

        // TODO nextTick just do not work here
        // so just use settimeout to scroll
        setTimeout(() => {
          scrollWrapper.value?.scrollTo({
            top: position.top,
            left: position.left,
            behavior: 'smooth',
          })
        }, 500)
      } else {
        nextTick(() => {
          scrollWrapper.value?.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    },
    { immediate: true }
  )

  return { scrollWrapper }
}
