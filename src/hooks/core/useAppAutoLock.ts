export const useAppAutoLock = () => {
  const appLock = useAppStoreLock()
  const appSetting = useAppStoreSetting()

  const { idle } = useIdle(appSetting.settings.app.idleMS)
  const visibility = useDocumentVisibility()

  // only work in auto mode
  watchEffect(() => {
    if (
      visibility.value === 'visible' &&
      appLock.lockMode !== AppConstLockMode.MANUAL &&
      appSetting.settings.app.idleMS !== 0
    ) {
      // app.value.isLock = idle.value
      appLock.setIsLock(idle.value)
      appLock.lockMode = AppConstLockMode.AUTO
    }
  })
}
