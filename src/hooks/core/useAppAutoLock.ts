export const useAppAutoLock = () => {
  const appLock = useAppLockStore()
  const appSetting = useAppSettingStore()

  const { idle } = useIdle(appSetting.settings.app.idleMS)
  const visibility = useDocumentVisibility()

  // only work in auto mode
  watchEffect(() => {
    if (
      visibility.value === 'visible' &&
      appLock.lockMode !== AppLockModeConst.MANUAL &&
      appSetting.settings.app.idleMS !== 0
    ) {
      // app.value.isLock = idle.value
      appLock.setIsLock(idle.value)
      appLock.lockMode = AppLockModeConst.AUTO
    }
  })
}
