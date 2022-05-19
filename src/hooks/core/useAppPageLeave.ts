export const useAppPageLeave = () => {
  const appLock = useAppLockStore()
  const appSetting = useAppSettingStore()

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
