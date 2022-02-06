export const useAppLock = () => {
  const { app, settings } = useAppState()
  const { idle } = useIdle(settings.value.ForDevelopers.app.idleMS)

  watchEffect(() => {
    if (settings.value.ForDevelopers.app.idleMS !== 0) {
      app.value.isLock = idle.value
    }
  })
}
