import { BaseAPI } from '../base'

export const logOperateAPI = new BaseAPI<AppSystemLogOperate>({
  model: 'system',
  section: 'log/operate',
})

export const logAuthAPI = new BaseAPI<AppSystemLogAuth>({
  model: 'system',
  section: 'log/auth',
})
