import type { AxiosRequestConfigExtend } from './src/types'

import axios from 'axios'

export * from './src/types'

import { Axios } from './src/Axios'
import { cacheAdapterEnhancer } from './src/adapter'
import { transform } from './transform'
import { isDev } from '../constant/vue'

const axiosConfig: AxiosRequestConfigExtend = {
  baseURL: isDev()
    ? import.meta.env.VITE_PROXY_PREFIX
    : import.meta.env.VITE_API_TARGET + import.meta.env.VITE_API_PREFIX,

  // time out, default is 10s
  timeout: Number(import.meta.env.VITE_AXIOS_TIMEOUT_SECOND) * 1000,

  transform,

  // Default Config
  customConfig: {
    // no timestamp
    timestamp: false,

    // carry token
    needAuth: true,

    // api only work in dev mode
    demonstrate: false,

    // no cache
    cache: false,

    // filter null value
    filterNull: true,

    // transform "true"/"false" to true/false
    transformStringBoolean: true,

    // custom each api cached time
    cachedSeconds: Number(import.meta.env.VITE_AXIOS_CACHE_SECOND) * 1000,

    // default is not to auto decrypt response data
    // used for to get some keys from backend
    autoDecryptResponseData: false,

    // default is not to auto encrypt the request data
    // used for in signin/signup case
    autoEncryptRequestData: false,
  },

  // adapter for cache, default is 5s
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!, {
    cachedSeconds: Number(import.meta.env.VITE_AXIOS_CACHE_SECOND) * 1000,
  }),
}

export const AppAxios = new Axios(axiosConfig)
