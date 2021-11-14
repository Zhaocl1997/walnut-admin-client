import { BaseAPI } from '../base'

export const roleAPI = new BaseAPI<AppRole>({
  model: 'system',
  section: 'role',
})
