import type { AxiosRequestConfigExtend } from './src/types'

import axios from 'axios'

export * from './src/types'

import { Axios } from './src/Axios'
import { cacheAdapterEnhancer } from './src/adapter'
import { transform } from './transform'

const { axiosTimeout, axiosCache } = useAppEnv('seconds')

const { httpUrl } = useAppEnv('proxy')

const axiosConfig: AxiosRequestConfigExtend = {
  baseURL: httpUrl,

  // time out, default is 10s
  timeout: Number(axiosTimeout) * 1000,

  transform,

  // Default Config
  customConfig: {
    // no timestamp
    timestamp: false,

    // carry token
    needAuth: true,

    // no cache
    cache: false,

    // filter null value
    // TODO cannot remember why doing this
    filterNull: false,

    // transform "true"/"false" to true/false
    transformStringBoolean: true,

    // custom each api cached time
    cachedSeconds: Number(axiosCache) * 1000,

    // default is not to auto decrypt response data
    // used for to get some keys from backend
    autoDecryptResponseData: false,

    // default is not to auto encrypt the request data
    // used for in signin/signup case
    autoEncryptRequestData: false,
  },

  // adapter for cache, default is 5s
  adapter: ['xhr', 'http'],
  // TODO try axios-extensions
  // cacheAdapterEnhancer(axios.defaults.adapter!, {
  //   cachedSeconds: Number(axiosCache) * 1000,
  // }),
}

export const AppAxios = new Axios(axiosConfig)
