import type { AxiosTransform } from './src/types'

import { AppGlobalContext } from '/@/store/ctx'

import { checkReponseErrorStatus } from './checkStatus'

// custom transform for req and res interceptors
export const transform: AxiosTransform = {
  // Here handler request logic
  requestInterceptors: (config) => {
    const mergedCustomOptions = config.customConfig!

    // carry token
    if (mergedCustomOptions.needAuth) {
      const token = AppGlobalContext.user.token

      token && (config.headers!['Authorization'] = `Bearer ${token}`)
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
      useAppNotification().error({ title: msg })
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
      useAppNotification().error({ title: 'Demonstrate Only!' })
    } else {
      const statusCode = (err.response?.data as any).statusCode
      const msg = (err.response?.data as any).detail?.message
      checkReponseErrorStatus(statusCode, msg)
    }

    return Promise.reject(err)
  },
}
