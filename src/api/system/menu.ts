import { BaseAPI } from '../base'

export const menuAPI = new BaseAPI<AppMenu>({
  model: 'system',
  section: 'menu',
})
