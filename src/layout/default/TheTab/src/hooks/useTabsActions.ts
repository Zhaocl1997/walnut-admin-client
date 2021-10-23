import { removeTabs } from '/@/core/tab'

export const useTabsActions = () => {
  const onTabClick = (name: string) => {
    // push by name
    useRouterPush({ name: name })
  }

  const onTabRemove = (
    name: string,
    type: ValueOfDeleteTabConst = 'TAB_SINGLE'
  ) => {
    // remove tab
    removeTabs(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
