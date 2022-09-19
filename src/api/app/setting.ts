import { BaseAPI } from '../base'

export const appSettingAPI = new BaseAPI<AppSettingsModel>({
  model: 'app',
  section: 'setting',
})
