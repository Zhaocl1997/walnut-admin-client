import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getAuthSettings } from '@/api/app/setting'

const useAppStoreSettingBackendInside = defineStore(
  StoreKeys.APP_SETTING_BACKEND,
  {
    state: (): AppSettingBackendState => ({
      auth: {},
    }),

    getters: {
      getAccountEnabled(state) {
        return +state.auth?.account! === 1
      },

      getEmailEnabled(state) {
        return +state.auth?.email! === 1
      },

      getPhoneEnabled(state) {
        return +state.auth?.phone! === 1
      },

      getQrcodeEnabled(state) {
        return +state.auth?.qrcode! === 1
      },

      getGiteeEnabled(state) {
        return +state.auth?.gitee! === 1
      },

      getGitHubEnabled(state) {
        return +state.auth?.github! === 1
      },

      getWeiboEnabled(state) {
        return +state.auth?.weibo! === 1
      },

      getQQEnabled(state) {
        return +state.auth?.qq! === 1
      },

      getAliPayEnabled(state) {
        return +state.auth?.alipay! === 1
      },

      getWechatEnabled(state) {
        return +state.auth?.wechat! === 1
      },
    },

    actions: {
      async getAppAuthSettings() {
        const res = await getAuthSettings()

        this.auth = res
      },
    },
  }
)

const useAppStoreSettingBackendOutside = () =>
  useAppStoreSettingBackendInside(store)

export const useAppStoreSettingBackend = () => {
  if (getCurrentInstance()) return useAppStoreSettingBackendInside()
  return useAppStoreSettingBackendOutside()
}
