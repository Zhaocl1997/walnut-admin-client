import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { cacheAdapterEnhancer, retryAdapterEnhancer, throttleAdapterEnhancer } from './src/adapters'

const { axiosTimeout } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

export const originalConfig: AxiosRequestConfig = {
  baseURL: httpUrl,

  // time out, default is 10s
  timeout: Number(axiosTimeout) * 1000,

  adapter: retryAdapterEnhancer(throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter!),
  )),

  // default transform "true"/"false" to true/false
  _transformStringBoolean: true,
}
