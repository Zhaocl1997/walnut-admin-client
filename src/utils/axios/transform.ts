import type { AxiosRequestConfigExtend, AxiosTransform } from './src/types'

import {
  easyFilterEmptyValue,
  easyTransformObjectStringBoolean,
} from 'easy-fns-ts'
import { merge } from 'lodash-es'

import { checkReponseErrorStatus } from './checkStatus'
import { AppResponseEncryption, AppRequestEncryption } from '../crypto'

const userAuth = useAppStoreUserAuth()
const appLocale = useAppStoreLocale()

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

    // adapt for backend locale messages
    config.headers!['Accept-Language'] = appLocale.locale.replace('_', '-')

    // carry token
    if (mergedCustomOptions.needAuth) {
      userAuth.access_token && setTokenInRequest(config, userAuth.access_token)
    }

    // add timestamp
    if (mergedCustomOptions.timestamp) {
      config.url += `?_t=${Date.now()}`
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

    // auto encrypt body data(post)
    if (mergedCustomOptions.autoEncryptRequestData) {
      const cryptedObj = Object.fromEntries(
        mergedCustomOptions.encryptFields!.map((key) => [
          key,
          AppRequestEncryption.encrypt(config.data[key]),
        ])
      )

      config.data = merge(config.data, cryptedObj)
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
      // @ts-ignore
      if (res.config.customConfig.autoDecryptResponseData) {
        return Promise.resolve(AppResponseEncryption.decrypt(data))
      }

      return Promise.resolve(data)
    }

    // when access token is expired, call refresh token api to get new token
    if (code === BussinessCodeConst.ACCESS_TOKEN_EXPIRED) {
      const config = res.config

      // TODO bug
      // router push too fast, which means last page going on requesting, then go to another page, will cause fake death of page

      if (!isRefreshing) {
        isRefreshing = true

        return userAuth
          .GetNewATWithRT()
          .then((refresh_token) => {
            if (!refresh_token) return

            setTokenInRequest(config, refresh_token)

            // token already refreshed, call the waiting request
            requestsQueue.forEach((cb) => cb(refresh_token))
            // clean queue
            requestsQueue = []

            // add customConfig
            // @ts-ignore
            return AppAxios.request(config, config.customConfig)
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
      userAuth.Signout(false)
      return Promise.resolve()
    }

    const badRequestCodeList: number[] = [
      BussinessCodeConst.SIGNIN_USER_NOT_FOUND,
      BussinessCodeConst.SIGNIN_PASS_NOT_VALID,
      BussinessCodeConst.SIGNIN_USER_BANNED,
      BussinessCodeConst.DATA_EXISTED,
      BussinessCodeConst.DATA_NOT_FOUND,
      BussinessCodeConst.DATA_DELETE_ERROR,
      BussinessCodeConst.DATA_ERROR,
      BussinessCodeConst.DATA_BAD_ID,
      BussinessCodeConst.NOT_FOUND,
      BussinessCodeConst.DATABASE_ERROR,
      BussinessCodeConst.CUSTOM_ERROR,
    ]

    if (badRequestCodeList.includes(code)) {
      useAppNotiError(msg)

      // since we have the error message, just resolve so handle logic behind
      return Promise.reject()
    }

    return Promise.reject()
  },

  // Here handle response error
  responseInterceptorsCatch: (err) => {
    const { t } = AppI18n.global

    if (err.message === 'Network Error') {
      useAppRouterPush({ name: '500' })
      return
    }

    if (err.message === 'Demonstrate') {
      // TODO 93
      // @ts-ignore
      useAppNotiError(t('app.base.demonstrate'))
    } else {
      const statusCode = err.response?.data.statusCode
      const msg = err.response?.data.detail?.message
      checkReponseErrorStatus(statusCode, msg)
    }

    return Promise.reject(err)
  },
}
