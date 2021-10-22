import { getPermissions } from '/@/api/auth'

import { rootName } from '/@/router/constant'

import { buildMenus, buildKeepAliveRouteNameList } from './menu'
import { buildRoutes } from './route'

const { menu } = useAppState()

/**
 * @description App Core Function 1 - Routes & Menus & KeepAliveRouteNameList. Will add permissions handle logic here later.
 * Used in two places
 * 1. sign in operation
 * 2. route guard protection
 */
export const AppCoreFn1 = async () => {
  const { addRoute } = AppRouter

  // Here is where we request from back end to get login user permissions.
  const res = await getPermissions()

  // set menus state
  menu.menus = buildMenus(res.data)!

  // set index menu name, use for home page
  menu.indexMenuName = menu.menus[0].name!

  // set keep alive route name
  menu.keepAliveRouteNames = buildKeepAliveRouteNameList(res.data)

  // build routes and add into root route
  const routes = buildRoutes(res.data)
  routes.forEach((route: any) => {
    addRoute(rootName, route)
  })
}
