import { BaseAPI } from '../base'

export const userAPI = new BaseAPI<AppSystemUser>({
  model: 'system',
  section: 'user',
})
