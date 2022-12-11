export const useAppReducedMotion = () => {
  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.app.reducedMotion,
    (v) => {
      document.documentElement.setAttribute('reduced-motion', `${v}`)
    },
    {
      immediate: true,
    }
  )

  watchEffect(() => {
    appSetting.app.reducedMotion = _APP_CAN_SYSTEM_ANIMATE_.value
  })
}
