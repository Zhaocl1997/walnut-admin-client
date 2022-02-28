import type { AxiosTransform } from './src/types'

import {
  easyFilterEmptyValue,
  easyTransformObjectStringBoolean,
} from 'easy-fns-ts'

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

    // filter null value in config.data
    if (mergedCustomOptions.filterNull && config.data) {
      config.data = easyFilterEmptyValue(config.data)
    }

    // transform "true"/"false" to true/false
    if (mergedCustomOptions.transformStringBoolean && config.data) {
      config.data = easyTransformObjectStringBoolean(config.data)
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
      useAppNotiError(msg)

      // since we have the error message, just resolve so handle logic behind
      return Promise.resolve()
    }
  },

  // Here handle response error
  responseInterceptorsCatch: (err) => {
    const { t } = AppI18n.global

    if (err.message === 'Network Error') {
      useRouterPush({ name: '500' })
      return
    }

    if (err.message === 'Demonstrate') {
      // TODO 93
      // @ts-ignore
      useAppNotiError(t('app:base:demonstrate'))
    } else {
      const statusCode = err.response?.data.statusCode
      const msg = err.response?.data.detail?.message
      checkReponseErrorStatus(statusCode, msg)
    }

    return Promise.reject(err)
  },
}
