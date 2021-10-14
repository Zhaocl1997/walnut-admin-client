import type { Menu } from '/@/router/types'
import { createPermissions } from '../../router/core'

const setMenus = (menus: Menu[]) => {
  const { menu } = useAppContext<false>()

  menu.menus = menus
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

  setMenus(menus)
  setKeepAliveRouteNames(keepAliveRouteNames)

  return routes
}
