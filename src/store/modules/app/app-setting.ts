import { defineStore } from 'pinia'
import { clone } from 'lodash-es'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

import AppSettingsFromJson from '/@/settings.json'

const useAppStoreSettingInside = defineStore(StoreKeys.APP_SETTING, {
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
        this.getMenuCollapseMode === AppConstCollapseMode.BUTTON
      )
    },

    getShowMenuCollapseIcon(): boolean {
      return (
        this.getShowMenuCollpase &&
        this.getMenuCollapseMode === AppConstCollapseMode.ICON
      )
    },

    getShowMenuCollapseBuiltIn(): boolean | string {
      if (
        this.getShowMenuCollpase &&
        this.getMenuCollapseMode !== AppConstCollapseMode.ICON &&
        this.getMenuCollapseMode !== AppConstCollapseMode.BUTTON
      ) {
        return this.getMenuCollapseMode
      }
      return false
    },

    getShowAside(state) {
      return state.settings.app.showLogo || state.settings.app.showMenu
    },

    getShowNormalAside(): boolean {
      const appAdapter = useAppStoreAdapter()

      return !appAdapter.isMobile && this.getShowAside
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

const useAppStoreSettingOutside = () => useAppStoreSettingInside(store)

export const useAppStoreSetting = () => {
  if (getCurrentInstance()) return useAppStoreSettingInside()
  return useAppStoreSettingOutside()
}
