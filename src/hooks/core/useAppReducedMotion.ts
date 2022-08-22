export const useAppReducedMotion = () => {
  const appSetting = useAppStoreSetting()
  const prefersReducedMotion = usePreferredReducedMotion()

  watch(
    () => appSetting.settings.app.reducedMotion,
    (v) => {
      document.documentElement.setAttribute('reduce', `${v}`)
    },
    {
      immediate: true,
    }
  )

  watchEffect(() => {
    appSetting.settings.app.reducedMotion =
      prefersReducedMotion.value === 'reduce'
  })
}
