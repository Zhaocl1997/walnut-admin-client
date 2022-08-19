export const useAppReducedMotion = () => {
  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.settings.app.reducedMotion,
    (v) => {
      document.documentElement.setAttribute('reduce', `${v}`)
    },
    {
      immediate: true,
    }
  )
}
