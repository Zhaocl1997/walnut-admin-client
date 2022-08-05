import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { arrToTree, orderTree } from 'easy-fns-ts'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { AppRootName } from '@/router/constant'

const useAppStoreMenuInside = defineStore(StoreKeys.APP_MENU, {
  state: (): AppMenuState => ({
    collapse: false,
    showAside: false,

    menus: [],
    keepAliveRouteNames: [],
    indexMenuName: undefined,
  }),

  getters: {},

  actions: {
    setCollapse(payload: boolean) {
      this.collapse = payload
    },

    setShowAside(payload: boolean) {
      this.showAside = payload
    },

    setMenus(payload: AppSystemMenu[]) {
      this.menus = payload
    },

    setKeepAliveRouteNames(payload: string[]) {
      this.keepAliveRouteNames = payload
    },

    setIndexMenuName(payload: string) {
      this.indexMenuName = payload
    },

    /**
     * @description create route object based on menu object
     */
    createRouteByMenu(node: AppSystemMenu): AppTab {
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
          menuActiveName: node.menuActiveName,
          menuActiveSameTab: node.menuActiveSameTab,
        },
      }
    },

    /**
     * @description create menus main function, filter and build/order tree
     */
    createMenus(payload: AppSystemMenu[]) {
      const appTab = useAppStoreTab()

      // filter `catalog` and `menu`
      // in order to fit menu show in breadcrumb but do not show in menus, `show` filter is done in `TheAside` => `menu.vue`
      const filtered = cloneDeep(payload).filter(
        (i) => i.type !== AppConstMenuType.ELEMENT
      )

      // init the affixed tabs
      appTab.initAffixedTabs(filtered)

      // build tree
      const menuTree = arrToTree(filtered, { id: '_id' })

      // just pick the root children
      const menus = orderTree(menuTree)[0].children

      return menus
    },

    /**
     * @description clean all menu state
     */
    clearMenus() {
      this.setMenus([])
      this.setKeepAliveRouteNames([])
      this.setIndexMenuName('')
      this.setCollapse(false)
      this.setShowAside(false)
    },

    /**
     * @description Generate keep-alive component name lists based on `menu`
     * Need to mention, when nested routes wants to be kept-alive, it's parent name also need to be in the `include` array as well
     * Since we flat routes, so need to add root route name finally
     * @link https://github.com/vuejs/vue-router-next/issues/626
     */
    createKeepAliveRouteNames(menus: AppSystemMenu[]): string[] {
      return menus
        .map((i) => {
          if (i.type === AppConstMenuType.MENU && i.cache) return i.name!
          return ''
        })
        .filter(Boolean)
        .concat(AppRootName)
    },
  },
})

const useAppStoreMenuOutside = () => useAppStoreMenuInside(store)

export const useAppStoreMenu = () => {
  if (getCurrentInstance()) return useAppStoreMenuInside()
  return useAppStoreMenuOutside()
}
