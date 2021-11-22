export const useAppFullScreen = () => {
  const { appMemo } = useAppState()

  const { isFullscreen } = useFullscreen()

  watchEffect(() => {
    appMemo.value.isFullScreen = isFullscreen.value
  })
}
