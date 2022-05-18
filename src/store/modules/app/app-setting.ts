import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

import AppSettingsFromJson from '/@/settings.json'

const useAppSettingStoreInside = defineStore(StoreKeys.APP_SETTING, {
  state: (): AppSettingState => ({
    settings: AppSettingsFromJson as AppSettings,
  }),

  getters: {},

  actions: {},
})

const useAppSettingStoreOutside = () => useAppSettingStoreInside(store)

export const useAppSettingStore = () => {
  if (getCurrentInstance()) return useAppSettingStoreInside()
  return useAppSettingStoreOutside()
}
