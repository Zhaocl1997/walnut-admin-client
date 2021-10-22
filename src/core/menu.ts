import { arrToTree, orderTree } from 'easy-fns-ts'

import { tabActionCreate } from '/@/store/actions/tabs'

import { createCommonRoute } from './route'

/**
 * @description Build Menus Core Function
 */
export const buildMenus = (payload: AppMenu[]) => {
  // filter menus which are visible aside
  const visibled = payload.filter((i) => i.show)

  // unshift the affixed-visibled-ordered tab into tab store
  visibled
    .filter((i) => i.affix)
    .sort((a, b) => b.order! - a.order!)
    .map((i) => tabActionCreate(createCommonRoute(i), 'unshift'))

  // build tree
  const menuTree = arrToTree(visibled, { id: '_id' })

  // just pick the root children
  const menus = orderTree(menuTree)[0].children

  return menus
}

/**
 * @description Generate keep-alive component name lists based on `menu` list.
 */
export const buildKeepAliveRouteNameList = (payload: AppMenu[]): string[] =>
  payload
    .filter((i) => i.type === MenuTypeConst.MENU && i.cache)
    .map((i) => i.name!)
