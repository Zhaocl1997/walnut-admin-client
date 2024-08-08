import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { cacheAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from './src/adapters'

const { axiosTimeout } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

const adapter = axios.getAdapter('fetch')

export const originalConfig: AxiosRequestConfig = {
  baseURL: httpUrl,

  // time out, default is 10s
  timeout: Number(axiosTimeout) * 1000,

  adapter: [retryAdapterEnhancer(adapter), throttleAdapterEnhancer(adapter), cacheAdapterEnhancer(adapter)],

  // default transform "true"/"false" to true/false
  _transformStringBoolean: true,
}
