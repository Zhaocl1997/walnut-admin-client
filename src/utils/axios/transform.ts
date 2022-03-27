import type { AxiosRequestConfigExtend, AxiosTransform } from './src/types'

import {
  easyFilterEmptyValue,
  easyTransformObjectStringBoolean,
} from 'easy-fns-ts'

import { checkReponseErrorStatus } from './checkStatus'
import {
  userActionRefreshToken,
  userActionSignOut,
} from '/@/store/actions/user'
import { BussinessCodeConst } from '/@/const/axios'

const { token, refresh_token } = useAppState()

// flag to judge if calling refreshing token api
let isRefreshing = false
// waiting queue
let requestsQueue: ((token: string) => void)[] = []

const setTokenInRequest = (config: AxiosRequestConfigExtend, token: string) => {
  config.headers!['Authorization'] = `Bearer ${token}`
}

// custom transform for req and res interceptors
export const transform: AxiosTransform = {
  // Here handler request logic
  requestInterceptors: (config) => {
    const mergedCustomOptions = config.customConfig!

    // carry token
    if (mergedCustomOptions.needAuth) {
      token.value && setTokenInRequest(config, token.value)
    }

    // set refresh token in header as well, didn't use cookie
    if (true) {
      refresh_token.value && (config.headers!['Refresh'] = refresh_token.value)
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
    // code below is custom code in `axios.response.data`
    const { code, data, msg } = res.data

    // normal success
    if (code === BussinessCodeConst.SUCCESS) {
      return Promise.resolve(data)
    }

    // when access token is expired, call refresh token api to get new token
    if (code === BussinessCodeConst.ACCESS_TOKEN_EXPIRED) {
      const config = res.config

      if (!isRefreshing) {
        isRefreshing = true

        return userActionRefreshToken()
          .then((res) => {
            setTokenInRequest(config, res)

            // token already refreshed, call the waiting request
            requestsQueue.forEach((cb) => cb(res))
            // clean queue
            requestsQueue = []

            return AppAxios.request(config)
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        // when refreshing token, return a promise that haven't called resolve
        return new Promise((resolve) => {
          // push resolve into queue, using an anonymous function to wrap it. ASAP token refresh is done, excute
          requestsQueue.push((t) => {
            setTokenInRequest(config, t)
            resolve(AppAxios.request(config))
          })
        })
      }
    }

    // refresh token is expired, so this user need to signout and re-signin
    if (code === BussinessCodeConst.REFRESH_TOKEN_EXPIRED) {
      userActionSignOut(false)
      return Promise.resolve()
    }

    const badRequestCodeList: number[] = [
      BussinessCodeConst.SIGNIN_USER_NOT_FOUND,
      BussinessCodeConst.SIGNIN_PASS_NOT_VALID,
      BussinessCodeConst.SIGNIN_USER_BANNED,
    ]

    if (badRequestCodeList.includes(code)) {
      useAppNotiError(msg)

      // since we have the error message, just resolve so handle logic behind
      return Promise.reject()
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
