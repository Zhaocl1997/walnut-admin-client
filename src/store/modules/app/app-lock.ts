import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreLockInside = defineStore(StoreKeys.APP_LOCK, {
  state: (): AppLockState => ({
    lockMode: useAppStorage(
      AppConstPersistKey.LOCK_MODE,
      AppConstLockMode.AUTO,
      Infinity
    ),
    isLock: useAppStorage(AppConstPersistKey.IS_LOCK, false, Infinity),
  }),

  getters: {},

  actions: {
    setLockMode(payload: ValueOfAppConstLockMode) {
      this.lockMode = payload
    },

    setIsLock(payload: boolean) {
      this.isLock = payload
    },
  },
})

const useAppStoreLockOutside = () => useAppStoreLockInside(store)

export const useAppStoreLock = () => {
  if (getCurrentInstance()) return useAppStoreLockInside()
  return useAppStoreLockOutside()
}
