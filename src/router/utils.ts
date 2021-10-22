import type { Menu } from './types'

import ParentComponent from '/@/layout/default/TheParent'
import IFrameComponent from '/@/layout/iframe/index.vue'
import { MenuTypeConst } from '../const'

/**
 * @description Build route object through menu node
 */
export const createCommonRoute = (node: Menu): RouteRecordRaw | any => {
  return {
    path: node.path,
    name: node.name,
    meta: {
      title: node.title,
      icon: node.icon,
      cache: node.cache,
      url: node.url,
      affix: node.affix,
    },
  }
}

/**
 * @description Generate keep-alive component name lists based on `menu` list.
 */
export const createKeepAliveRouteNameList = (menus: Menu[]): string[] =>
  menus
    .filter((i) => i.type === MenuTypeConst.MENU && i.cache)
    .map((i) => i.name as string)

/**
 * @description Resolve `catalog` type menu with self name
 */
export const resolveParentComponent =
  (name: string | symbol | undefined) => () =>
    new Promise((resolve) => {
      resolve({
        ...ParentComponent,
        name,
      })
    })

/**
 * @description Resolve `menu` type menu which is internal with self name
 */
export const resolveIFrameComponent =
  (name: string | symbol | undefined) => () =>
    new Promise((resolve) => {
      resolve({
        ...IFrameComponent,
        name,
      })
    })

/**
 * @description Resolve `views` dynamically base on `node.component` which equal to `path`
 */
export const resolveViewModules = (component: string) => {
  const allViewModules = import.meta.glob('../views/**/*.vue')

  const keys = Object.keys(allViewModules)

  const index = keys.findIndex(
    (i) => i.replace('../views/', '').replace('.vue', '') === component
  )

  return allViewModules[keys[index]]
}
