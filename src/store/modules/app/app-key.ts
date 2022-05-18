import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppKeyStoreInside = defineStore(StoreKeys.APP_KEY, {
  state: (): AppKeyState => ({
    baiduAK: undefined,
  }),

  getters: {},

  actions: {
    setBaiduAK(payload: string) {
      this.baiduAK = payload
    },
  },
})

const useAppKeyStoreOutside = () => useAppKeyStoreInside(store)

export const useAppKeyStore = () => {
  if (getCurrentInstance()) return useAppKeyStoreInside()
  return useAppKeyStoreOutside()
}
