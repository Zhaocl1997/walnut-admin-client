import type { Menu } from './types'

import { arrToTree, formatTree, orderTree } from 'easy-fns-ts'

import { getPermissions } from '../api/auth'
import { notFoundRoute } from './routes'
import {
  createKeepAliveRouteNameList,
  createCommonRoute,
  resolveIFrameComponent,
  resolveParentComponent,
  resolveViewModules,
} from './utils'
import { tabActionCreate } from '../store/actions/tabs'
import { MenuTypeConst } from '../const'

/**
 * @description Get menu data to display aside, build and order into tree structure.
 */
export const createMenus = (menus: Menu[]) => {
  // filter menus which are visible aside
  const visibled = menus.filter((i) => i.show)

  // unshift the affixed-visibled-ordered tab into tab store
  visibled
    .filter((i) => i.affix)
    .sort((a, b) => b.order! - a.order!)
    .map((i) => tabActionCreate(createCommonRoute(i), 'unshift'))

  // build tree
  const menuTree = arrToTree(visibled, { id: '_id' })

  // order tree
  const orderedTree = orderTree(menuTree)[0].children

  return orderedTree
}

/**
 * @description Get routes based on menus
 */
export const createRoutes = (menus: Menu[]) => {
  const routes = formatTree(menus, {
    format: (node: Menu): RouteRecordRaw | undefined => {
      // handle catelog
      if (node.type === MenuTypeConst.CATALOG) {
        return {
          ...createCommonRoute(node),
          component: resolveParentComponent(node.name),
        }
      }

      // handle menu
      if (node.type === MenuTypeConst.MENU) {
        // handle internal menu
        if (node.ternal === 'internal') {
          return {
            ...createCommonRoute(node),
            component: resolveIFrameComponent(node.name),
          }
        }

        // common view route
        return {
          ...createCommonRoute(node),
          component: resolveViewModules(node.component),
        }
      }
    },
  })

  routes.push(notFoundRoute)

  return routes
}

/**
 * @description Entry permission
 */
export const createPermissions = async () => {
  // Here is where we request from back end to get login user permissions.
  const res = await getPermissions()

  // keep-alive name list
  const keepAliveRouteNames = createKeepAliveRouteNameList(res.data)

  // menus
  const menus = createMenus(res.data)

  // routes
  const routes = createRoutes(menus!)

  return {
    keepAliveRouteNames,
    menus,
    routes,
  }
}
