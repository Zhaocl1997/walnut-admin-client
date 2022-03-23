import { BaseAPI } from '../base'

export const menuAPI = new BaseAPI<AppSystemMenu>({
  model: 'system',
  section: 'menu',
})
