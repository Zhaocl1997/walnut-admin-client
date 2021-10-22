import type { AxiosTransform } from './src/types'

import { checkReponseErrorStatus } from './checkStatus'

const { token } = useAppState()

// custom transform for req and res interceptors
export const transform: AxiosTransform = {
  // Here handler request logic
  requestInterceptors: (config) => {
    const mergedCustomOptions = config.customConfig!

    // carry token
    if (mergedCustomOptions.needAuth) {
      token.value &&
        (config.headers!['Authorization'] = `Bearer ${token.value}`)
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
      useAppNotification().error({ title: msg, duration: 2000 })
      // since we have the error message, just resolve so handle logic behind
      return Promise.resolve()
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
