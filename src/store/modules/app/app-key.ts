import { getBaiduKeyAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreSecretKeyInside = defineStore(StoreKeys.APP_KEY, {
  state: (): IAppStoreKey => ({}),

  getters: {},

  actions: {
    setBaiduAK(payload: string) {
      this.baiduAK = payload
    },

    async initBaiduKey() {
      const res = await getBaiduKeyAPI()

      this.setBaiduAK(res.B!)
    },

    clearKeys() {
      this.setBaiduAK('')
    },
  },
})

const useAppStoreSecretKeyOutside = () => useAppStoreSecretKeyInside(store)

export function useAppStoreSecretKey() {
  if (getCurrentInstance())
    return useAppStoreSecretKeyInside()
  return useAppStoreSecretKeyOutside()
}
