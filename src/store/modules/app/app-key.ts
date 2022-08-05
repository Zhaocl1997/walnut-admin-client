import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getSecretKeys } from '@/api/auth'

const useAppStoreSecretKeyInside = defineStore(StoreKeys.APP_KEY, {
  state: (): AppKeyState => ({}),

  getters: {},

  actions: {
    setBaiduAK(payload: string) {
      this.baiduAK = payload
    },

    async getSecretKeys() {
      const res = await getSecretKeys()

      this.setBaiduAK(res.B!)
    },

    clearKeys() {
      this.setBaiduAK('')
    },
  },
})

const useAppStoreSecretKeyOutside = () => useAppStoreSecretKeyInside(store)

export const useAppStoreSecretKey = () => {
  if (getCurrentInstance()) return useAppStoreSecretKeyInside()
  return useAppStoreSecretKeyOutside()
}
