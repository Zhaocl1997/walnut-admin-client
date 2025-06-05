import type { AxiosAdapter, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { cacheAdapterEnhancer, cancelAdapterEnhancer, mergeAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from './src/adapters'

const { axiosTimeout } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

const adapter = axios.getAdapter('fetch')

const adapterEnhancers: Array<(adapter: AxiosAdapter) => AxiosAdapter> = [
  cancelAdapterEnhancer,
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
  retryAdapterEnhancer,
  mergeAdapterEnhancer,
]

export function composeAdapters(adapter: AxiosAdapter): AxiosAdapter {
  return adapterEnhancers.reduceRight((acc, enhancer) => enhancer(acc), adapter)
}

export const originalConfig: AxiosRequestConfig = {
  baseURL: httpUrl,

  withCredentials: true,

  paramsSerializer: {
    // default, string array use comma to join into string
    // ['a', 'b'] => 'a,b'
    serialize: params => qs.stringify(params, { arrayFormat: 'comma' }),
  },

  // time out, default is 10s
  timeout: Number(axiosTimeout) * 1000,

  // adapter
  adapter: composeAdapters(adapter),

  // default transform "true"/"false" to true/false
  _transformStringBoolean: true,
}
