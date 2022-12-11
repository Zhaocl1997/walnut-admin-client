export const useAppColorMode = () => {
  const appSetting = useAppStoreSetting()
  const appColorMode = useSharedColorMode()

  watch(
    () => appSetting.app.colorMode,
    (v) => {
      appColorMode.value = v
    },
    {
      immediate: true,
    }
  )
}
