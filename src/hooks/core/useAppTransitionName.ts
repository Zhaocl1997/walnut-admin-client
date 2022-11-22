export const useAppTransitionName = () => {
  const appSetting = useAppStoreSetting()

  const { currentRoute } = useAppRouter()

  const getTransitionName = computed(() => {
    const setting = appSetting.settings.app
    if (setting.showAnimation) {
      if (setting.animationMode === AppConstAnimationMode.GLOBAL) {
        return setting.animationName
      } else {
        return (
          currentRoute.value.meta?.animationName || AppConstTransitionName.FADE
        )
      }
    }
    return null
  })

  return { getTransitionName }
}
