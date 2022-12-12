import { formatTree, findPath, arrToTree, orderTree } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'

import ParentComponent from '@/layout/default/TheContent'
import IFrameFaker from '@/layout/iframe/faker.vue'
import IFrameReal from '@/layout/iframe/index.vue'
import { App404Route, App500Route } from '../routes/builtin'

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
const resolveIFrameComponent = (name: string, cache?: boolean) => () =>
  new Promise((resolve) => {
    cache
      ? resolve({
          ...IFrameFaker,
          name,
        })
      : resolve({
          ...IFrameReal,
          name,
        })
  })

const allViewModules = import.meta.glob('../../views/**/*.vue')

/**
 * @description Util Function 4 - Resolve `views` dynamically base on `node.component` which equal to `path`
 */
const resolveViewModules = (component: string) => {
  if (!component) return

  const keys = Object.keys(allViewModules)

  // find the file location same index
  const index = keys.findIndex(
    (i) => i.replace('../../views/', '').replace('.vue', '') === component
  )

  return allViewModules[keys[index]]
}

/**
 * @description Build Routes Core Function
 */
export const buildRoutes = (payload: AppSystemMenu[]) => {
  const appMenu = useAppStoreMenu()

  // filter `catalog` and `menu`
  const filtered = payload.filter((i) => i.type !== AppConstMenuType.ELEMENT)

  // build tree
  const menuTree = arrToTree(filtered, { id: '_id' })

  // just pick the root children
  const menus = orderTree(menuTree)[0].children

  const routes = formatTree<AppSystemMenu, RouteRecordRaw>(menus!, {
    format: (node) => {
      // handle catelog
      if (node.type === AppConstMenuType.CATALOG) {
        return {
          ...appMenu.createRouteByMenu(node),
          component: resolveParentComponent(node.name!),
        }
      }

      // handle menu
      if (node.type === AppConstMenuType.MENU) {
        // handle internal menu
        if (node.ternal === AppConstMenuTernal.INTERNAL) {
          return {
            ...appMenu.createRouteByMenu(node),
            component: resolveIFrameComponent(node.name!, node.cache),
          }
        }

        // ...
        // no need to handle with extenal menu
        // ...

        // common view route
        return {
          ...appMenu.createRouteByMenu(node),
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
  _tempRoutes.push(App500Route)
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
      if (node.meta?.type === AppConstMenuType.MENU) {
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
