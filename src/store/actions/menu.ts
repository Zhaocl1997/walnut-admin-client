import type { Menu } from '/@/router/types'
import type { TreeNode } from 'easy-fns-ts'
import { createPermissions } from '../../router/core'
import { formatTree } from 'easy-fns-ts'
import { STORAGE_MENU } from '/@/utils/persistent'

const setMenus = (menus: TreeNode<Menu[]>) => {
  const { menu } = useAppContext<false>()

  // make menu data reactive
  menu.menus = computed(() =>
    formatTree<Menu>(menus, {
      format: (node) => ({ ...node, title: AppI18n.global.t(node.title) }),
    })
  ) as unknown as Menu[]

  // set first menu name as index menu name
  menu.indexMenuName = menu.menus[0]?.name as string
  STORAGE_MENU.value.indexMenuName = menu.menus[0]?.name as string
}

const setKeepAliveRouteNames = (keepAliveRouteNames: string[]) => {
  const { menu } = useAppContext<false>()

  menu.keepAliveRouteNames = keepAliveRouteNames
}

/**
 * @description Action - Menu - Signin
 */
export const menuActionPermissions = async () => {
  const { menus, keepAliveRouteNames, routes } = await createPermissions()

  setMenus(menus!)
  setKeepAliveRouteNames(keepAliveRouteNames)

  return routes
}
