import { getPermissions } from '@/api/auth'
import { buildRoutes } from '@/router/utils/route'

/**
 * @description App Core Function 1 - Routes & Menus & KeepAliveRouteNameList. Will add permissions handle logic here later.
 * Used in two places
 * 1. sign in operation
 * 2. route guard protection
 */
export async function AppCoreFn1() {
  const appMenu = useAppStoreMenu()
  const appTab = useAppStoreTab()
  const userPermission = useAppStoreUserPermission()

  const { addRoute, getRoutes } = AppRouter

  const rootRoute
    = getRoutes()[getRoutes().findIndex(i => i.path === AppRootPath)]

  // Here is where we request from back end to get login user permissions.
  const { permissionMenuTree, permissionStrings, permissionRouteTree, keepAliveNames, indexMenuName, affixedTabs } = await getPermissions()

  // set menu tree
  appMenu.setMenus(permissionMenuTree)

  // set keep alive route name
  appMenu.setKeepAliveRouteNames(appMenu.createKeepAliveRouteNames(keepAliveNames))

  // set index menu name, use for home page
  appMenu.setIndexMenuName(indexMenuName)

  // set affixed tabs
  appTab.setAffixedTabs(affixedTabs)

  // set permission string array
  userPermission.setPermissions(permissionStrings)

  // build routes and add into root route
  const routes = buildRoutes(permissionRouteTree)

  routes.forEach((route) => {
    addRoute(AppRootName, route)
  })

  // set root redirect since we do not prepare root page
  rootRoute.redirect = {
    name: appMenu.indexMenuName,
  }
}
