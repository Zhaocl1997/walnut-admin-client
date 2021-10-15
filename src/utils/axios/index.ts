import type { AxiosRequestConfigExtend } from './src/types'

import axios from 'axios'

export * from './src/types'

import { Axios } from './src/Axios'
import { cacheAdapterEnhancer } from './src/adapter'
import { transform } from './transform'
import { getApiPrefix } from '../index'

// api url
const baseURL = `${import.meta.env.VITE_PROXY}${getApiPrefix(
  import.meta.env.VITE_API_PREFIX,
  import.meta.env.VITE_API_VERSION
)}`

const axiosConfig: AxiosRequestConfigExtend = {
  baseURL,

  // time out, default is 10s
  timeout: Number(import.meta.env.VITE_AXIOS_TIMEOUT) * 1000,

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
  },

  // adapter for cache, default is 5s
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!, {
    maxAge: Number(import.meta.env.VITE_AXIOS_CACHE_MAXAGE) * 1000,
  }),
}

export const AppAxios = new Axios(axiosConfig)
