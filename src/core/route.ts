import { formatTree } from 'easy-fns-ts'

import ParentComponent from '/@/layout/default/TheContent'
import IFrameComponent from '/@/layout/iframe/index.vue'

import { App404Route } from '/@/router/routes'

/**
 * @description Util Function 1 - Build route object through menu object
 */
export const buildCommonRoute = (node: AppMenu): AppTab => {
  return {
    path: node.path!,
    name: node.name!,
    meta: {
      title: node.title,
      icon: node.icon,
      cache: node.cache,
      url: node.url,
      affix: node.affix,
      type: node.type,
      component: node.component,
    },
  }
}

/**
 * @description Util Function 2 - Resolve `catalog` type menu with self name
 */
const resolveParentComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...ParentComponent,
      name,
      parentView: true,
    })
  })

/**
 * @description Util Function 3 - Resolve `menu` type menu which is internal with self name
 */
const resolveIFrameComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...IFrameComponent,
      name,
    })
  })

/**
 * @description Util Function 4 - Resolve `views` dynamically base on `node.component` which equal to `path`
 */
const resolveViewModules = (component: string) => {
  const allViewModules = import.meta.glob('../views/**/*.vue')

  const keys = Object.keys(allViewModules)

  // find the file location same index
  const index = keys.findIndex(
    (i) => i.replace('../views/', '').replace('.vue', '') === component
  )

  return allViewModules[keys[index]]
}

/**
 * @description Build Routes Core Function
 */
export const buildRoutes = (payload: AppMenu[]) => {
  const routes = formatTree(payload, {
    format: (node: AppMenu): RouteRecordRaw | undefined => {
      // handle catelog
      if (node.type === MenuTypeConst.CATALOG) {
        return {
          ...buildCommonRoute(node),
          component: resolveParentComponent(node.name!),
        }
      }

      // handle menu
      if (node.type === MenuTypeConst.MENU) {
        // handle internal menu
        if (node.ternal === 'internal') {
          return {
            ...buildCommonRoute(node),
            component: resolveIFrameComponent(node.name!),
          }
        }

        // ...
        // no need to handle with extenal menu
        // ...

        // common view route
        return {
          ...buildCommonRoute(node),
          component: resolveViewModules(node.component),
        }
      }
    },
  })

  // finally push the 404
  routes.push(App404Route)

  return routes
}
