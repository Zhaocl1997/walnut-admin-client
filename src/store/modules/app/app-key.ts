import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getBaiduKey } from '@/api/auth'

const useAppStoreSecretKeyInside = defineStore(StoreKeys.APP_KEY, {
  state: (): AppKeyState => ({}),

  getters: {},

  actions: {
    setBaiduAK(payload: string) {
      this.baiduAK = payload
    },

    async initBaiduKey() {
      const res = await getBaiduKey()

      this.setBaiduAK(res?.B!)
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
