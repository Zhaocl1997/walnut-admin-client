import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const preferredColor = usePreferredColorScheme()

const useAppDarkStoreInside = defineStore(StoreKeys.APP_DARK, {
  state: (): AppDarkState => ({
    darkMode: useAppStorage(
      'app-darkMode',
      preferredColor.value as ValueOfDarkModeConst
    ),
    isDark: useAppStorage(
      'app-isDark',
      preferredColor.value === DarkModeConst.DARK
    ),
  }),

  getters: {},

  actions: {
    setDarkMode(payload: ValueOfDarkModeConst) {
      this.darkMode = payload
    },

    setIsDark(payload: boolean) {
      this.isDark = payload
    },
  },
})

const useAppDarkStoreOutside = () => useAppDarkStoreInside(store)

export const useAppDarkStore = () => {
  if (getCurrentInstance()) return useAppDarkStoreInside()
  return useAppDarkStoreOutside()
}
