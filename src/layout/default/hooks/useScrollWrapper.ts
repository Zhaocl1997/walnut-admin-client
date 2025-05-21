export function useScrollWrapper() {
  const userScroll = useAppStoreUserScroll()

  const { currentRoute } = useAppRouter()

  const scrollWrapper = useTemplateRef<HTMLElement>('scrollWrapper')
  const { x, y, arrivedState, directions } = useScroll(scrollWrapper, { behavior: 'smooth', throttle: 250, idle: 1000 })

  const { top: directionTop } = toRefs(directions)

  const { top, bottom } = toRefs(arrivedState)

  debouncedWatch(
    () => [x.value, y.value] as const,
    ([x, y]) => {
      if (currentRoute.value.meta.position)
        userScroll.setScrollPosition(currentRoute.value.name as string, y, x)
    },
    { immediate: true, debounce: 200 },
  )

  watch(
    () => currentRoute.value.meta.position,
    async (v) => {
      if (v) {
        const position = userScroll.getScrollPosition(
          currentRoute.value.name as string,
        )

        const id = setTimeout(() => {
          scrollWrapper.value?.scrollTo({
            top: position.top,
            left: position.left,
            behavior: 'smooth',
          })
          clearTimeout(id)
        }, 500)
      }
      else {
        await nextTick(() => {
          scrollWrapper.value?.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    },
    { immediate: true },
  )

  function onScrollToTop() {
    scrollWrapper.value?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return { scrollWrapper, top, bottom, directionTop, y, onScrollToTop }
}
