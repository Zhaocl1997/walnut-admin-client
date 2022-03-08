import { toggleLeftMenuLayout } from '/@/settings'

export const useAppFullScreen = () => {
  const { isFullscreen } = useFullscreen()

  watchEffect(() => {
    if (!isFullscreen.value) {
      toggleLeftMenuLayout(true)
    }
  })
}
