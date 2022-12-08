export const useAppReducedMotion = () => {
  const appSetting = useAppStoreSetting()
  const prefersReducedMotion = usePreferredReducedMotion()

  watch(
    () => appSetting.app.reducedMotion,
    (v) => {
      document.documentElement.setAttribute('reduce', `${v}`)
    },
    {
      immediate: true,
    }
  )

  watchEffect(() => {
    appSetting.app.reducedMotion = prefersReducedMotion.value === 'reduce'
  })
}
