import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const preferredLanguages = usePreferredLanguages()

const useAppStoreLocaleInside = defineStore(StoreKeys.APP_LOCALE, {
  state: (): AppLocaleState => ({
    locale: useAppStorage(
      AppConstPersistKey.LOCALE,
      preferredLanguages.value[0] as ValueOfAppConstLocale,
      Infinity,
    ),
  }),

  getters: {},

  actions: {
    setLocale(payload: ValueOfAppConstLocale) {
      this.locale = payload
    },
  },
})

const useAppStoreLocaleOutside = () => useAppStoreLocaleInside(store)

export const useAppStoreLocale = () => {
  if (getCurrentInstance())
    return useAppStoreLocaleInside()
  return useAppStoreLocaleOutside()
}
