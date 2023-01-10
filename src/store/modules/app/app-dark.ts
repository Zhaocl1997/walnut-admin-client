import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const preferredColor = usePreferredColorScheme()

const useAppStoreDarkInside = defineStore(StoreKeys.APP_DARK, {
  state: (): AppDarkState => ({
    darkMode: useAppStorage(
      AppConstPersistKey.DARK_MODE,
      preferredColor.value as ValueOfAppConstDarkMode,
      { expire: Infinity },
    ),
    isDark: useAppStorage(
      AppConstPersistKey.IS_DARK,
      preferredColor.value === AppConstDarkMode.DARK,
      { expire: Infinity },
    ),
  }),

  getters: {},

  actions: {
    setDarkMode(payload: ValueOfAppConstDarkMode) {
      this.darkMode = payload
    },

    setIsDark(payload: boolean) {
      this.isDark = payload
    },
  },
})

const useAppStoreDarkOutside = () => useAppStoreDarkInside(store)

export const useAppStoreDark = () => {
  if (getCurrentInstance())
    return useAppStoreDarkInside()
  return useAppStoreDarkOutside()
}
