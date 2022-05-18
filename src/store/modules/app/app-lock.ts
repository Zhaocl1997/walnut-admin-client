import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppLockStoreInside = defineStore(StoreKeys.APP_LOCK, {
  state: (): AppLockState => ({
    lockMode: useAppStorage('app-lockMode', AppLockModeConst.AUTO),
    isLock: useAppStorage('app-isLock', false),
  }),

  getters: {},

  actions: {
    setLockMode(payload: ValueOfAppLockModeConst) {
      this.lockMode = payload
    },

    setIsLock(payload: boolean) {
      this.isLock = payload
    },
  },
})

const useAppLockStoreOutside = () => useAppLockStoreInside(store)

export const useAppLockStore = () => {
  if (getCurrentInstance()) return useAppLockStoreInside()
  return useAppLockStoreOutside()
}
