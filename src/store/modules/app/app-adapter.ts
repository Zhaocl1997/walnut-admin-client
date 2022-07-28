import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppAdapterStoreInside = defineStore(StoreKeys.APP_ADAPTER, {
  state: (): AppState => ({
    device: DevideConst.DESKTOP,
  }),

  getters: {
    isMobile(state) {
      return state.device === DevideConst.MOBILE
    },
  },

  actions: {
    setDevice(payload: ValueOfDevideConst) {
      this.device = payload
    },
  },
})

const useAppAdapterStoreOutside = () => useAppAdapterStoreInside(store)

export const useAppAdapterStore = () => {
  if (getCurrentInstance()) return useAppAdapterStoreInside()
  return useAppAdapterStoreOutside()
}
