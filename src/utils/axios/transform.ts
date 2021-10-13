import type { AxiosTransform } from './src/types'

// import { ElNotification } from 'element-plus'

import { getToken } from '../auth'
import { checkReponseErrorStatus } from './checkStatus'
import { useRouterPush } from '/@/router'

// custom transform for req and res interceptors
export const transform: AxiosTransform = {
  // Here handler request logic
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

  // Here handle response data
  responseInterceptors: (res) => {
    const { code, data, msg } = res.data

    if (code === 200) {
      return Promise.resolve(data)
    } else {
      // ElNotification({ type: 'error', message: msg })
      return Promise.reject()
    }
  },

  // Here handle response error
  responseInterceptorsCatch: (err) => {
    if (err.message === 'Network Error') {
      useRouterPush({ name: '500' })
      return
    }

    if (err.message === 'Demonstrate') {
      // ElNotification({ type: 'warning', message: 'Demonstrate Only!' })
    } else {
      const statusCode = err.response?.data.statusCode
      const msg = err.response?.data.detail.message
      checkReponseErrorStatus(statusCode, msg)
    }

    return Promise.reject(err)
  },
}
