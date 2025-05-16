export function useAppContentFull() {
  const { currentRoute } = useAppRouter()
  const appSetting = useAppStoreSetting()

  watchEffect(() => {
    if (currentRoute.value.query.full)
      appSetting.toggleLayout(false)
  })
}
