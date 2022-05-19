export const useAppFullScreen = () => {
  const { isFullscreen } = useFullscreen()
  const appSetting = useAppSettingStore()

  watchEffect(() => {
    if (!isFullscreen.value) {
      appSetting.toggleLeftMenuLayout(true)
    }
  })
}
