import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getSecretKeys } from '/@/api/auth'

const useAppKeyStoreInside = defineStore(StoreKeys.APP_KEY, {
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

const useAppKeyStoreOutside = () => useAppKeyStoreInside(store)

export const useAppKeyStore = () => {
  if (getCurrentInstance()) return useAppKeyStoreInside()
  return useAppKeyStoreOutside()
}
