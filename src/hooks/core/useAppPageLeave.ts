export const useAppPageLeave = () => {
  const appLock = useAppStoreLock()
  const appSetting = useAppStoreSetting()

  const isLeft = usePageLeave()

  debouncedWatch(
    isLeft,
    () => {
      if (appSetting.settings.app.pageLeaveLock) {
        appLock.setIsLock(isLeft.value)
      }
    },
    { debounce: 200 }
  )
}
