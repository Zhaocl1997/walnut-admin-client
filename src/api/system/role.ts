import { BaseAPI } from '../base'

export const roleAPI = new BaseAPI<AppSystemRole>({
  model: 'system',
  section: 'role',
})
