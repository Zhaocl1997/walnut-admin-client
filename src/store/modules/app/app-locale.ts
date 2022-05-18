import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const preferredLanguages = usePreferredLanguages()

const useAppLocaleStoreInside = defineStore(StoreKeys.APP_LOCALE, {
  state: (): AppLocaleState => ({
    locale: useAppStorage(
      'app-locale',
      preferredLanguages.value[0].replace('-', '_') as ValueOfLocaleConst
    ),
  }),

  getters: {},

  actions: {
    setLocale(payload: ValueOfLocaleConst) {
      this.locale = payload
    },
  },
})

const useAppLocaleStoreOutside = () => useAppLocaleStoreInside(store)

export const useAppLocaleStore = () => {
  if (getCurrentInstance()) return useAppLocaleStoreInside()
  return useAppLocaleStoreOutside()
}
