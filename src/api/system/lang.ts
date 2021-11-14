import { BaseAPI } from '../base'

export const langAPI = new BaseAPI<AppLang>({
  model: 'system',
  section: 'lang',
})
