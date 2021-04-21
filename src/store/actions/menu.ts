import { useAppContext } from '/@/App'
import { createPermissions } from '/@/router/core'
import { Menu } from '/@/router/types'

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
