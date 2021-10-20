import type { Menu } from '/@/router/types'
import type { TreeNode } from 'easy-fns-ts'
import { createPermissions } from '../../router/core'
import { formatTree } from 'easy-fns-ts'

const setMenus = (menus: TreeNode<Menu[]>) => {
  const { menu } = useAppContext<false>()

  menu.menus = computed(() =>
    formatTree<Menu>(menus, {
      format: (node) => ({ ...node, title: AppI18n.global.t(node.title) }),
    })
  ) as unknown as Menu[]
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
