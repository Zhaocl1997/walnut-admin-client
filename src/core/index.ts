import { getPermissions } from '/@/api/auth'

import { AppRootName, AppRootPath } from '/@/router/constant'

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
  const { addRoute, getRoutes } = AppRouter

  // Here is where we request from back end to get login user permissions.
  const res = await getPermissions()

  // set menus state
  menu.value.menus = buildMenus(res.data)!

  // set index menu name, use for home page
  menu.value.indexMenuName = menu.value.menus[0].name!

  // set keep alive route name
  menu.value.keepAliveRouteNames = buildKeepAliveRouteNameList(res.data)

  // build routes and add into root route
  const routes = buildRoutes(menu.value.menus)
  routes.forEach((route) => {
    addRoute(AppRootName, route)
  })

  // set root redirect since we do not prepare root page
  getRoutes()[getRoutes().findIndex((i) => i.path === AppRootPath)].redirect = {
    name: menu.value.indexMenuName,
  }
}
