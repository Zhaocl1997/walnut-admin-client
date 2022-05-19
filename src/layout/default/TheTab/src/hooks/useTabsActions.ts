export const useTabsActions = () => {
  const appTab = useAppTabStore()

  const onTabClick = async (item: AppTab) => {
    // push by name
    await appTab.goTab(item.name, item.query, item.params)
  }

  const onTabRemove = (
    name: string,
    type: ValueOfDeleteTabConst = DeleteTabConst.TAB_SINGLE
  ) => {
    // remove tab
    appTab.deleteTabs(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
