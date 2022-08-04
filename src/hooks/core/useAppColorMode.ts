export const useAppColorMode = () => {
  const appSetting = useAppStoreSetting()

  const modes = Object.fromEntries(
    Object.values(AppConstColorMode).map((i) => [i, i])
  )

  const mode = useColorMode({
    modes,
    attribute: 'color-mode',
  })

  watchEffect(() => {
    mode.value = appSetting.settings.app.colorMode
  })
}
