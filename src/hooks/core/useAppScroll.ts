export const useAppScroll = () => {
  const userScroll = useAppStoreUserScroll()

  const { currentRoute } = useAppRouter()

  const scrollWrapper = ref<HTMLElement>()
  const { x, y } = useScroll(scrollWrapper)

  debouncedWatch(
    () => [x.value, y.value] as const,
    ([_, y]) => {
      if (currentRoute.value.meta.position) {
        userScroll.setScrollTop(currentRoute.value.name as string, y)
      }
    },
    { immediate: true, debounce: 200 }
  )

  watch(
    () => currentRoute.value.meta.position,
    (v) => {
      if (v) {
        const top = userScroll.getScrollTop(currentRoute.value.name as string)

        // TODO nextTick just do not work here
        setTimeout(() => {
          scrollWrapper.value?.scrollTo({ top: top, behavior: 'smooth' })
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
