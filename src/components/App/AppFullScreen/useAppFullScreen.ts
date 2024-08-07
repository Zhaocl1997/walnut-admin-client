// no use yet
export function useAppFullScreen() {
  const { isFullscreen } = useFullscreen()
  const appSetting = useAppStoreSetting()

  watchEffect(() => {
    if (!isFullscreen.value)
      appSetting.toggleLeftMenuLayout(true)
  })
}
