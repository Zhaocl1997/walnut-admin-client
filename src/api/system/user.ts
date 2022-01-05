import { BaseAPI } from '../base'

export const userAPI = new BaseAPI<AppUser>({
  model: 'system',
  section: 'user',
})
