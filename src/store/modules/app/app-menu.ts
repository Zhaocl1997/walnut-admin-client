import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppMenuStoreInside = defineStore(StoreKeys.APP_MENU, {
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
  },
})

const useAppMenuStoreOutside = () => useAppMenuStoreInside(store)

export const useAppMenuStore = () => {
  if (getCurrentInstance()) return useAppMenuStoreInside()
  return useAppMenuStoreOutside()
}
