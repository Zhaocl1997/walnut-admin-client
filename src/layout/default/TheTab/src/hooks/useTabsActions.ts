import { DeleteTabTypeEnum } from '/@/enums/tab'
import { useRouterPush } from '/@/router'
import { useAppStore } from '/@/store/'

export const useTabsActions = () => {
  const { dispatch } = useAppStore()

  const onTabClick = (name: string) => {
    // push by name
    useRouterPush({ name: name })
  }

  const onTabRemove = (
    name: string,
    type: DeleteTabTypeEnum = DeleteTabTypeEnum.TAB_SELF
  ) => {
    // remove tab
    dispatch('tab/commitDeleteTab', { name, type })
  }

  return {
    onTabClick,
    onTabRemove,
  }
}
