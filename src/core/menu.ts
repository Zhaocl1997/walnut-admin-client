import { arrToTree, orderTree } from 'easy-fns-ts'

import { buildTabs } from './tab'

import { buildCommonRoute } from './route'

/**
 * @description Build Menus Core Function
 */
export const buildMenus = (payload: AppMenu[]) => {
  // filter `catalog` and `menu`
  // filter `catalog` and `menu` which are visible
  const filtered = payload
    .filter((i) => i.type !== MenuTypeConst.ELEMENT)
    .filter((i) => i.show)

  // unshift the affixed-visibled-ordered tab into tab store
  filtered
    .filter((i) => i.affix)
    .sort((a, b) => b.order! - a.order!)
    .map((i) => buildTabs(buildCommonRoute(i), 'unshift'))

  // build tree
  const menuTree = arrToTree(filtered, { id: '_id' })

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
