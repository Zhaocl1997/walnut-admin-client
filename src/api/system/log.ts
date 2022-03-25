import { BaseAPI } from '../base'

export const logOperateAPI = new BaseAPI<AppSystemLogOperate>({
  model: 'system',
  section: 'log/operate',
})
