export const useTabsActions = (onUpdateOverflow: Fn) => {
  const appTab = useAppStoreTab()

  const onTabClick = async (item: AppTab) => {
    // push by name
    await appTab.goTab(item.name, item.query, item.params)
  }

  const onTabRemove = async (
    name: string,
    type: ValueOfAppConstTabDeleteType = AppConstTabDeleteType.TAB_SINGLE,
  ) => {
    // remove tab
    await appTab.deleteTabs(name, type)

    // TODO
    const { stop } = useTimeoutFn(() => {
      onUpdateOverflow()
      stop()
    }, 1000)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
