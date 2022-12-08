export const useAppColorMode = () => {
  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.app.colorMode,
    (v) => {
      _APP_COLOR_MODE_.value = v
    },
    {
      immediate: true,
    }
  )
}
