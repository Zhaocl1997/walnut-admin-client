import { defineStore } from 'pinia'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

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
          animationName: node.animationName,
          badge: node.badge,
          activeIcon: node.activeIcon,
          position: node.position,
          leaveTip: node.leaveTip,
        },
      }
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
    createKeepAliveRouteNames(menus: string[]): string[] {
      return menus.concat(AppRootName)
    },

    /**
     * @description go to index menu
     */
    async goIndex() {
      await useAppRouterPush({ name: this.indexMenuName })
    },
  },
})

const useAppStoreMenuOutside = () => useAppStoreMenuInside(store)

export function useAppStoreMenu() {
  if (getCurrentInstance())
    return useAppStoreMenuInside()
  return useAppStoreMenuOutside()
}
