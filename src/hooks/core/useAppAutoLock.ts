export const useAppAutoLock = () => {
  const { app, settings } = useAppState()
  const { idle } = useIdle(settings.value.ForDevelopers.app.idleMS)
  const visibility = useDocumentVisibility()

  // only work in auto mode
  watchEffect(() => {
    if (
      visibility.value === 'visible' &&
      app.value.lockMode !== AppLockModeConst.MANUAL &&
      settings.value.ForDevelopers.app.idleMS !== 0
    ) {
      app.value.isLock = idle.value
      app.value.lockMode = AppLockModeConst.AUTO
    }
  })
}
