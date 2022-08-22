// no use yet
export const useAppFullScreen = () => {
  const { isFullscreen } = useFullscreen()
  const appSetting = useAppStoreSetting()

  watchEffect(() => {
    if (!isFullscreen.value) {
      appSetting.toggleLeftMenuLayout(true)
    }
  })
}
