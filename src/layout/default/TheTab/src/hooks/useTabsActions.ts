export const useTabsActions = () => {
  const appTab = useAppStoreTab()

  const onTabClick = async (item: AppTab) => {
    // push by name
    await appTab.goTab(item.name, item.query, item.params)
  }

  const onTabRemove = (
    name: string,
    type: ValueOfAppConstTabDeleteType = AppConstTabDeleteType.TAB_SINGLE
  ) => {
    // remove tab
    appTab.deleteTabs(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
