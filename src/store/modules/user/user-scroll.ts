import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserScrollInside = defineStore(StoreKeys.USER_SCROLL, {
  state: (): UserScrollState => ({
    scrollMap: useAppStorage(AppConstPersistKey.SCROLL, new Map()),
  }),

  getters: {},

  actions: {
    setScrollTop(name: string, top: number) {
      this.scrollMap.set(name, { top })
    },
  },
})

const useAppStoreUserScrollOutside = () => useAppStoreUserScrollInside(store)

export const useAppStoreUserScroll = () => {
  if (getCurrentInstance()) return useAppStoreUserScrollInside()
  return useAppStoreUserScrollOutside()
}
