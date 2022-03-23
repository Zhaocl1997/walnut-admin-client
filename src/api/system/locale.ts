import { BaseAPI } from '../base'

export const localeAPI = new BaseAPI<AppSystemLocale>({
  model: 'system',
  section: 'locale',
})
