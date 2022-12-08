export const useAppLock = () => {
  const { currentRoute } = useAppRouter()

  const appLock = useAppStoreLock()
  const appSetting = useAppStoreSetting()

  const isLeft = usePageLeave()
  const { idle } = useIdle(appSetting.app.lockIdleSeconds * 1000)

  // detect user idle
  watch(idle, async (v) => {
    if (
      appSetting.app.lockMode === AppConstLockMode.IDLE &&
      v &&
      appSetting.app.lockIdleSeconds !== 0
    ) {
      await appLock.lock(currentRoute)
    }
  })

  // detect mouse leave page or not
  debouncedWatch(
    isLeft,
    async (v) => {
      if (appSetting.app.lockMode === AppConstLockMode.SECURITY && v) {
        await appLock.lock(currentRoute)
      }
    },
    { debounce: 200 }
  )

  // detect window visibility
  watch(
    () => _APP_DOCUMENT_VISIBLE_.value,
    async (v) => {
      if (appSetting.app.lockMode === AppConstLockMode.SECURITY && v) {
        await appLock.lock(currentRoute)
      }
    }
  )
}
