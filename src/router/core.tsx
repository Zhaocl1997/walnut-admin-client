import type { Menu } from './types'
import type { RouteRecordRaw } from 'vue-router'

import { arrToTree, formatTree, orderTree } from 'easy-fns-ts'

import { getPermissions } from '../api/auth'
import { MenuTypeEnum } from '../enums/menu'
import { notFoundRoute } from './constant'
import {
  createKeepAliveRouteNameList,
  createCommonRoute,
  resolveIFrameComponent,
  resolveParentComponent,
  resolveViewModules,
} from './utils'

/**
 * @description Get menu data to display aside, build and order into tree structure.
 */
export const createMenus = (menus: Menu[]) => {
  // filter menus which are visible aside
  const visibleMenus = menus.filter((i) => i.show)

  // build tree
  const menuTree = arrToTree(menus, { id: '_id' })

  // order tree
  const orderedTree = orderTree(menuTree, {
    order: 'order',
  })[0].children

  return orderedTree
}

/**
 * @description Get routes based on menus
 */
export const createRoutes = (menus: Menu[]) => {
  const routes = formatTree(menus, {
    format: (node: Menu): RouteRecordRaw | undefined => {
      // handle catelog
      if (node.type === MenuTypeEnum.CATALOG) {
        return {
          ...createCommonRoute(node),
          component: resolveParentComponent(node.name),
        }
      }

      // handle menu
      if (node.type === MenuTypeEnum.MENU) {
        // handle internal menu
        if (node.internal) {
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
