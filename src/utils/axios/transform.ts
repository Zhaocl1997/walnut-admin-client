import type { AxiosTransform } from './src/types'

import { ElNotification } from 'element-plus'

import { getToken } from '../auth'
import { checkReponseErrorStatus } from './checkStatus'

// custom transform for req and res interceptors
export const transform: AxiosTransform = {
  requestInterceptors: (config) => {
    const mergedCustomOptions = config.customConfig!

    // carry token
    if (mergedCustomOptions.needAuth) {
      getToken() && (config.headers['Authorization'] = `Bearer ${getToken()}`)
    }

    // Demonstrate purpose API
    if (mergedCustomOptions.demonstrate) {
      return Promise.reject(new Error('Demonstrate'))
    }

    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },

  responseInterceptors: (res) => {
    return Promise.resolve(res.data)
  },

  responseInterceptorsCatch: (err) => {
    if (err.message === 'Demonstrate') {
      ElNotification({ type: 'warning', message: 'Demonstrate Only!' })
      return Promise.reject(err)
    } else {
      const statusCode = err.response!.data.statusCode
      const msg = err.response!.data.detail.message
      checkReponseErrorStatus(statusCode, msg)
    }
  },
}
