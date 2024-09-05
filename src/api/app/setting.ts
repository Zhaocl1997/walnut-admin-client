import { BaseAPI } from '../base'

enum SettingEnum {
  PUBLIC = 'app/setting/public',
}

export const appSettingAPI = new BaseAPI<AppSettingsModel>({
  model: 'app',
  section: 'setting',
})

/**
 * @description get public settings
 */
export function getPublicSettings() {
  return AppAxios.get<AppSettingBackendState>({
    url: SettingEnum.PUBLIC,
  })
}
