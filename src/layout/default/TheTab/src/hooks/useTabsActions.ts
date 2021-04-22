import { DeleteTabTypeEnum } from '/@/enums/tab'
import { useRouterPush } from '/@/router'
import { tabActionDelete } from '/@/store/actions/tabs'

export const useTabsActions = () => {
  const onTabClick = (name: string) => {
    // push by name
    useRouterPush({ name: name })
  }

  const onTabRemove = (
    name: string,
    type: DeleteTabTypeEnum = DeleteTabTypeEnum.TAB_SELF
  ) => {
    // remove tab
    tabActionDelete(name, type)
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
