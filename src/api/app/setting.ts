import { BaseAPI } from '../base'

enum SettingEnum {
  AUTH = 'app/setting/auth',
}

export const appSettingAPI = new BaseAPI<AppSettingsModel>({
  model: 'app',
  section: 'setting',
})

/**
 * @description get auth settings
 */
export function getAuthSettings() {
  return AppAxios.get<AppPayloadSetting.AuthSetting>({
    url: SettingEnum.AUTH,
  })
}
