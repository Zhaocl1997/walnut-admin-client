import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { cacheAdapterEnhancer, cancelAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from './src/adapters'

const { axiosTimeout } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

const adapter = axios.getAdapter('fetch')

export const originalConfig: AxiosRequestConfig = {
  baseURL: httpUrl,

  paramsSerializer: {
    // default, string array use comma to join into string
    // ['a', 'b'] => 'a,b'
    serialize: params => qs.stringify(params, { arrayFormat: 'comma' }),
  },

  // time out, default is 10s
  timeout: Number(axiosTimeout) * 1000,

  // TODO so fucking ugly
  adapter: [retryAdapterEnhancer(throttleAdapterEnhancer(cacheAdapterEnhancer(cancelAdapterEnhancer(adapter))))],

  // default transform "true"/"false" to true/false
  _transformStringBoolean: true,
}
