const _storaged_tabs = useAppStorage<AppTab[]>(
  AppConstPersistKey.TABS,
  [],
  Infinity
)

export const useTabsPersistent = () => {
  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()

  watch(
    () => [appSetting.tabs.persistent, appTab.tabs],
    () => {
      if (appSetting.tabs.persistent) {
        _storaged_tabs.value = appTab.tabs
      } else {
        _storaged_tabs.value = []
      }
    },
    {
      deep: true,
    }
  )

  onMounted(() => {
    if (appSetting.tabs.persistent && _storaged_tabs.value.length) {
      appTab.tabs = _storaged_tabs.value
    }
  })
}
