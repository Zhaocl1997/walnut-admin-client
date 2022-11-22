import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserScrollInside = defineStore(StoreKeys.USER_SCROLL, {
  state: (): UserScrollState => ({
    scrollEntries: useAppStorage(AppConstPersistKey.SCROLL, [], Infinity),
  }),

  getters: {
    getScrollMap(state) {
      return Object.fromEntries(state.scrollEntries)
    },
  },

  actions: {
    setScrollTop(name: string, top: number) {
      const index = this.scrollEntries.findIndex((i) => i[0] === name)
      if (index === -1) {
        this.scrollEntries.push([name, { top }])
      } else {
        this.scrollEntries[index] = [name, { top }]
      }
    },

    getScrollTop(name: string) {
      if (this.getScrollMap[name]) {
        return this.getScrollMap[name].top
      }
      return 0
    },
  },
})

const useAppStoreUserScrollOutside = () => useAppStoreUserScrollInside(store)

export const useAppStoreUserScroll = () => {
  if (getCurrentInstance()) return useAppStoreUserScrollInside()
  return useAppStoreUserScrollOutside()
}
