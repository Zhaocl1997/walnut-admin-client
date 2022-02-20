import { removeTabs } from '/@/core/tab'

export const useTabsActions = () => {
  const { currentRoute } = useAppRouter()

  const onTabClick = (name: string, query: Recordable) => {
    // push by name
    useRouterPush({ name: name, query })
  }

  const onTabRemove = (
    name: string,
    type: ValueOfDeleteTabConst = 'TAB_SINGLE'
  ) => {
    // remove tab
    removeTabs(name, type, currentRoute.value.name as string)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
