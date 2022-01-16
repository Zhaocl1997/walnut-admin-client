import { removeTabs } from '/@/core/tab'

export const useTabsActions = () => {
  const { currentRoute } = useAppRouter()

  const onTabClick = (name: string) => {
    // push by name
    useRouterPush({ name: name })
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
