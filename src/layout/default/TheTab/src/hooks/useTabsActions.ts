import { removeTabs } from '/@/core/tab'

export const useTabsActions = (currentMouseTab: Ref<AppTab | undefined>) => {
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
    removeTabs(
      name,
      type,
      currentMouseTab.value!.name,
      currentRoute.value.name as string
    )
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
