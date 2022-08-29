export const useTabsPersistent = () => {
  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()

  const localTabs = useAppStorage<AppTab[]>(
    AppConstPersistKey.TABS,
    [],
    Infinity
  )

  watch(
    () => [appSetting.settings.tab.persistent, appTab.tabs],
    () => {
      if (appSetting.settings.tab.persistent) {
        localTabs.value = appTab.tabs
      } else {
        localTabs.value = []
      }
    },
    {
      deep: true,
    }
  )

  onMounted(() => {
    if (appSetting.settings.tab.persistent && localTabs.value.length) {
      appTab.tabs = localTabs.value
    }
  })
}
