import { BaseAPI } from '../base'

export const langAPI = new BaseAPI<AppSystemLang>({
  model: 'system',
  section: 'lang',
})
