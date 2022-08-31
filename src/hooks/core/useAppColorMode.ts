export const useAppColorMode = () => {
  const appSetting = useAppStoreSetting()

  const modes = Object.fromEntries(
    Object.values(AppConstColorMode).map((i) => [i, i])
  )

  const mode = useColorMode({
    modes,
    attribute: 'color-mode',
  })

  watch(
    () => appSetting.settings.app.colorMode,
    (v) => {
      mode.value = v
    }
  )
}
