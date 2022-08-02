import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreAdapterInside = defineStore(StoreKeys.APP_ADAPTER, {
  state: (): AppAdapterState => ({
    device: AppConstDevice.DESKTOP,
  }),

  getters: {
    isMobile(state) {
      return state.device === AppConstDevice.MOBILE
    },
  },

  actions: {
    setDevice(payload: ValueOfAppConstDevice) {
      this.device = payload
    },
  },
})

const useAppStoreAdapterOutside = () => useAppStoreAdapterInside(store)

export const useAppStoreAdapter = () => {
  if (getCurrentInstance()) return useAppStoreAdapterInside()
  return useAppStoreAdapterOutside()
}
