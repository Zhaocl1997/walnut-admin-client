import { BaseAPI } from '../base'

export const localeAPI = new BaseAPI<AppLocale>({
  model: 'system',
  section: 'locale',
})
