export const useAppFullScreen = () => {
  const { settings } = useAppState()

  const { isFullscreen } = useFullscreen()

  watchEffect(() => {
    if (!isFullscreen.value) {
      settings.value.ForDevelopers.app.showHeader = true
      settings.value.ForDevelopers.app.showLogo = true
      settings.value.ForDevelopers.app.showMenu = true
      settings.value.ForDevelopers.app.showTabs = true
    }
  })
}
