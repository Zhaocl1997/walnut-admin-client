import type { RouteRecordNameGeneric } from 'vue-router'
import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreCachedViewsInside = defineStore(StoreKeys.APP_CACHED_VIEWS, {
  state: (): AppCachedViewsState => ({
    cachedViewNameList: [],
  }),

  getters: {},

  actions: {
    setCached(name: RouteRecordNameGeneric) {
      if (this.cachedViewNameList.includes(name)) {
        return
      }
      this.cachedViewNameList.push(name)
    },

    hasCached(name: RouteRecordNameGeneric) {
      return this.cachedViewNameList.includes(name)
    },

    removeFromCached(name: RouteRecordNameGeneric) {
      const index = this.cachedViewNameList.findIndex(i => i === name)

      if (index) {
        this.cachedViewNameList.splice(index, 1)
      }
    },
  },
})

const useAppStoreCachedViewsOutside = () => useAppStoreCachedViewsInside(store)

export function useAppStoreCachedViews() {
  if (getCurrentInstance())
    return useAppStoreCachedViewsInside()
  return useAppStoreCachedViewsOutside()
}
