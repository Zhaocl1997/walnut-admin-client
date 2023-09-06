export function useAppReducedMotion() {
  const appSetting = useAppStoreSetting()
  const isReducedMotion = useSharedPreferredReducedMotion()

  watch(
    () => appSetting.app.reducedMotion,
    (v) => {
      document.documentElement.setAttribute('reduced-motion', `${v}`)
    },
    {
      immediate: true,
    },
  )

  watchEffect(() => {
    appSetting.app.reducedMotion = isReducedMotion.value
  })
}
