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

// time out , default 10 seconds
const timeout = 10 * 1000

const axiosConfig: AxiosRequestConfigExtend = {
  baseURL,

  timeout,

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

  // adapter for cache
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!, {
    maxAge: 5000,
  }),
}

export const AppAxios = new Axios(axiosConfig)
