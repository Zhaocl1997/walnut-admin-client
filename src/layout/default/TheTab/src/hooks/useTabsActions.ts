import { tabActionDelete } from '/@/store/actions/tabs'

export const useTabsActions = () => {
  const onTabClick = (name: string) => {
    // push by name
    useRouterPush({ name: name })
  }

  const onTabRemove = (
    name: string,
    type: ValueOfDeleteTabConst = 'TAB_SELF'
  ) => {
    // remove tab
    tabActionDelete(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
