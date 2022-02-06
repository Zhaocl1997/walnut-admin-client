export const useAppPageLeave = () => {
  const { app, settings } = useAppState()
  const isLeft = usePageLeave()

  debouncedWatch(
    isLeft,
    () => {
      if (settings.value.ForDevelopers.app.pageLeaveLock) {
        app.value.isLock = isLeft.value
      }
    },
    { debounce: 200 }
  )
}
