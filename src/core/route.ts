import { formatTree, findPath, arrToTree, orderTree } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'

import ParentComponent from '/@/layout/default/TheContent'
import IFrameComponent from '/@/layout/iframe/index.vue'

import { App404Route } from '/@/router/routes'
import { AppRootName } from '../router/constant'

/**
 * @description Util Function 1 - Build route object through menu object
 */
export const buildCommonRoute = (node: AppSystemMenu): AppTab => ({
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
    menuActiveName: node.menuActiveName,
    menuActiveSameTab: node.menuActiveSameTab,
  },
})

/**
 * @description Util Function 2 - Resolve `catalog` type menu with self name
 */
const resolveParentComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...ParentComponent,
      name,
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

const allViewModules = import.meta.glob('../views/**/*.vue')

/**
 * @description Util Function 4 - Resolve `views` dynamically base on `node.component` which equal to `path`
 */
const resolveViewModules = (component: string) => {
  const keys = Object.keys(allViewModules)

  // find the file location same index
  const index = keys.findIndex(
    (i) => i.replace('../views/', '').replace('.vue', '') === component
  )

  return allViewModules[keys[index]]
}

/**
 * @description Generate keep-alive component name lists based on `menu`
 * Need to mention, when nested routes wants to be kept-alive, it's parent name also need to be in the `include` array as well
 * Since we flat routes, so need to add root route name finally
 * @link https://github.com/vuejs/vue-router-next/issues/626
 */
export const buildKeepAliveRouteNameList = (menus: AppSystemMenu[]): string[] =>
  menus
    .map((i) => {
      if (i.type === MenuTypeConst.MENU && i.cache) return i.name!
      return ''
    })
    .filter(Boolean)
    .concat(AppRootName)

/**
 * @description Build Routes Core Function
 */
export const buildRoutes = (payload: AppSystemMenu[]) => {
  // filter `catalog` and `menu`
  const filtered = payload.filter((i) => i.type !== MenuTypeConst.ELEMENT)

  // build tree
  const menuTree = arrToTree(filtered, { id: '_id' })

  // just pick the root children
  const menus = orderTree(menuTree)[0].children

  const routes = formatTree<AppSystemMenu, RouteRecordRaw>(menus!, {
    format: (node) => {
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
        if (node.ternal === MenuTernalConst.INTERNAL) {
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
  // routes.push(App404Route)
  // return routes

  // TODO 999
  const _tempRoutes = _tempFlatNestedRoutes(routes)
  _tempRoutes.push(App404Route)
  return _tempRoutes
}

// TODO 999
/**
 * @description temporarily flat tree route into one level route
 * @link https://github.com/vuejs/vue-router-next/issues/626
 */
const _tempFlatNestedRoutes = (routes: RouteRecordRaw[]) => {
  const ret: RouteRecordRaw[] = []

  const tree = cloneDeep(routes)

  formatTree(tree, {
    format: (node) => {
      // findPath, it's an array
      const paths = findPath(
        tree,
        (n) => n.name === node.name
      ) as RouteRecordRaw[]

      // only handle menu
      if (node.meta?.type === MenuTypeConst.MENU) {
        if (paths.length > 1) {
          const newNode = paths.reduce(
            (prev, next) =>
              ({
                name: next.name,
                path: prev.path.startsWith('/')
                  ? `${prev.path}/${next.path}`
                  : `/${prev.path}/${next.path}`,
                meta: next.meta,
                component: next.component,
              } as RouteRecordRaw)
          )

          ret.push(newNode)
        } else if (!node.children) {
          // add `/` prefix when no children
          ret.push({ ...node, path: `/${node.path}` })
        }
      }
    },
  })

  return ret
}
