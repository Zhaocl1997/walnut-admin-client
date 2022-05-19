import { defineStore } from 'pinia'
import { clone } from 'lodash-es'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

import AppSettingsFromJson from '/@/settings.json'

const useAppSettingStoreInside = defineStore(StoreKeys.APP_SETTING, {
  state: (): AppSettingState => ({
    settings: clone(AppSettingsFromJson) as AppSettings,
  }),

  getters: {
    getMenuCollapseMode(state) {
      return state.settings.menu.collapseMode
    },

    getShowMenuCollpase(state): boolean {
      return state.settings.app.showMenu && state.settings.menu.showCollapse
    },

    getShowMenuCollapseButton(): boolean {
      return (
        this.getShowMenuCollpase &&
        this.getMenuCollapseMode === MenuCollapseModeConst.BUTTON
      )
    },

    getShowMenuCollapseIcon(): boolean {
      return (
        this.getShowMenuCollpase &&
        this.getMenuCollapseMode === MenuCollapseModeConst.ICON
      )
    },

    getShowMenuCollapseBuiltIn(): boolean | string {
      if (
        this.getShowMenuCollpase &&
        this.getMenuCollapseMode !== MenuCollapseModeConst.ICON &&
        this.getMenuCollapseMode !== MenuCollapseModeConst.BUTTON
      ) {
        return this.getMenuCollapseMode
      }
      return false
    },

    getShowAside(state) {
      return state.settings.app.showLogo || state.settings.app.showMenu
    },

    getShowNormalAside(): boolean {
      const appAdapter = useAppAdapterStore()

      return !appAdapter.isMobile && this.getShowAside
    },

    getContentWidth(state): string {
      const appAdapter = useAppAdapterStore()
      const appMenu = useAppMenuStore()

      return appAdapter.isMobile || !this.getShowAside
        ? '100vw'
        : appMenu.collapse
        ? `calc(100vw - ${state.settings.menu.collapsedWidth}px)`
        : `calc(100vw - ${state.settings.menu.width}px)`
    },
  },

  actions: {
    toggleLeftMenuLayout(val = false) {
      this.settings.app.showHeader = val
      this.settings.app.showLogo = val
      this.settings.app.showMenu = val
      this.settings.app.showTabs = val
      this.settings.app.showFooter = val
    },
  },
})

const useAppSettingStoreOutside = () => useAppSettingStoreInside(store)

export const useAppSettingStore = () => {
  if (getCurrentInstance()) return useAppSettingStoreInside()
  return useAppSettingStoreOutside()
}
