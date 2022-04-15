import { arrToTree, easyDeepClone, orderTree } from 'easy-fns-ts'

import { buildTabs } from './tab'

import { buildCommonRoute } from './route'

/**
 * @description Build Menus Core Function
 */
export const buildMenus = (payload: AppSystemMenu[]) => {
  // filter `catalog` and `menu`
  // filter `catalog` and `menu` which are visible
  // in order to fit menu show in breadcrumb but do not show in menus, `show` filter is done in TheAside => `menu.vue`
  const filtered = easyDeepClone(payload).filter(
    (i) => i.type !== MenuTypeConst.ELEMENT
  )

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
