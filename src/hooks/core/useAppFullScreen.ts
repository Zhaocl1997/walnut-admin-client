export const useAppFullScreen = () => {
  const { app } = useAppState()

  const { isFullscreen } = useFullscreen()

  watchEffect(() => {
    app.value.isFullScreen = isFullscreen.value
  })
}
