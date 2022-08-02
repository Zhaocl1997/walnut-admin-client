import { getPermissions } from '/@/api/auth'

import { AppRootName, AppRootPath } from '/@/router/constant'

import { buildRoutes } from '/@/router/utils/route'

/**
 * @description App Core Function 1 - Routes & Menus & KeepAliveRouteNameList. Will add permissions handle logic here later.
 * Used in two places
 * 1. sign in operation
 * 2. route guard protection
 */
export const AppCoreFn1 = async () => {
  const appMenu = useAppStoreMenu()
  const userPermission = useAppStoreUserPermission()

  const { addRoute, getRoutes } = AppRouter

  const rootRoute =
    getRoutes()[getRoutes().findIndex((i) => i.path === AppRootPath)]

  // Here is where we request from back end to get login user permissions.
  const res = await getPermissions()

  // set aside menu
  appMenu.setMenus(appMenu.createMenus(res)!)

  // set permission string array
  userPermission.setPermissions(userPermission.createPermissions(res))

  // set keep alive route name
  appMenu.setKeepAliveRouteNames(appMenu.createKeepAliveRouteNames(res))

  // set index menu name, use for home page
  appMenu.setIndexMenuName(appMenu.menus[0].name!)

  // build routes and add into root route
  const routes = buildRoutes(res)

  routes.forEach((route) => {
    addRoute(AppRootName, route)
  })

  // set root redirect since we do not prepare root page
  rootRoute.redirect = {
    name: appMenu.indexMenuName,
  }
}
