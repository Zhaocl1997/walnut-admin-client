import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreCapJSTokenInside = defineStore(StoreKeys.APP_CAPJS_TOKEN, {
  state: (): IAppCapJSTokenLocale => ({
    capJSToken: useAppStorage(
      AppConstPersistKey.CAPJS_TOKEN,
      '',
      { expire: 10 * 60 * 1000 },
    ),
  }),

  getters: {},

  actions: {
    setLocale(payload: string) {
      this.capJSToken = payload
    },
  },
})

const useAppStoreCapJSTokenOutside = () => useAppStoreCapJSTokenInside(store)

export function useAppStoreCapJSToken() {
  if (getCurrentInstance())
    return useAppStoreCapJSTokenInside()
  return useAppStoreCapJSTokenOutside()
}
