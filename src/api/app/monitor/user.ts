import { BaseAPI } from '../../base'

export const monitorUserAPI = new BaseAPI<AppMonitorUserModel>({
  model: 'app',
  section: 'monitor/user',
})
