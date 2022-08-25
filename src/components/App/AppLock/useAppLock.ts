export const useAppLock = () => {
  const { currentRoute } = useAppRouter()

  const appLock = useAppStoreLock()
  const appSetting = useAppStoreSetting()

  const isLeft = usePageLeave()
  const { idle } = useIdle(appSetting.settings.app.idleMS)
  const visibility = useDocumentVisibility()

  // detect user idle
  watch(idle, async (v) => {
    if (
      appSetting.settings.app.lockMode === AppConstLockMode.IDLE &&
      v &&
      appSetting.settings.app.idleMS !== 0
    ) {
      await appLock.lock(currentRoute)
    }
  })

  // detect mouse leave page or not
  debouncedWatch(
    isLeft,
    async (v) => {
      if (appSetting.settings.app.lockMode === AppConstLockMode.SECURITY && v) {
        await appLock.lock(currentRoute)
      }
    },
    { debounce: 200 }
  )

  // detect window visibility
  watch(visibility, async (v) => {
    if (
      appSetting.settings.app.lockMode === AppConstLockMode.SECURITY &&
      v === 'hidden'
    ) {
      await appLock.lock(currentRoute)
    }
  })
}
