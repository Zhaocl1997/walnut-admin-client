let cleanup: Fn

export const useAppHijackF5 = () => {
  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.app.hijackRefresh,
    (v) => {
      if (v) {
        cleanup = useEventListener('keydown', async (e) => {
          if (e.key === 'F5') {
            e.preventDefault()
            await useRedirect()
          }
        })
      } else {
        cleanup()
        cleanup = () => {}
      }
    },
    {
      immediate: true,
    }
  )
}
