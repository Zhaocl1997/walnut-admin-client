import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppTabStoreInside = defineStore(StoreKeys.APP_TAB, {
  state: (): AppTabState => ({
    tabs: [],
    visitedTabs: new Map(),
  }),

  getters: {},

  actions: {
    setTabs(payload: AppTab[]) {
      this.tabs = payload
    },

    setVisitedTabs(payload: Map<string, string[]>) {
      this.visitedTabs = payload
    },
  },
})

const useAppTabStoreOutside = () => useAppTabStoreInside(store)

export const useAppTabStore = () => {
  if (getCurrentInstance()) return useAppTabStoreInside()
  return useAppTabStoreOutside()
}
