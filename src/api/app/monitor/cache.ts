import { BaseAPI } from '../../base'

export const cacheAPI = new BaseAPI<AppCacheModel>({
  model: 'app',
  section: 'monitor/cache',
})
