import { removeTabs } from '/@/core/tab'

export const useTabsActions = () => {
  const onTabClick = (item: AppTab) => {
    // push by name
    useRouterPush({ name: item.name, query: item.query, params: item.params })
  }

  const onTabRemove = (
    name: string,
    type: ValueOfDeleteTabConst = DeleteTabConst.TAB_SINGLE
  ) => {
    // remove tab
    removeTabs(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
