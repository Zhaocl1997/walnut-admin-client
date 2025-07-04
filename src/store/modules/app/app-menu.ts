import { defineStore } from 'pinia'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreMenuInside = defineStore(StoreKeys.APP_MENU, {
  state: (): IAppStoreMenu => ({
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
