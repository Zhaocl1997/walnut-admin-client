import { BaseAPI } from '../../base'

export const monitorCacheAPI = new BaseAPI<AppMonitorCacheModel>({
  model: 'app',
  section: 'monitor/cache',
})
