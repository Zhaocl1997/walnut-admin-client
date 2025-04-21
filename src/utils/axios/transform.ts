import axios from 'axios'
import {
  easyTransformObjectStringBoolean,
} from 'easy-fns-ts'
import { merge } from 'lodash-es'

import { AppRequestEncryption, AppResponseEncryption } from '../crypto'
import { checkReponseErrorStatus } from './checkStatus'
import { RefreshTokenLogic, setTokenHeader } from './refreshToken'

const userAuth = useAppStoreUserAuth()
const appLocale = useAppStoreLocale()

// custom transform for req and res interceptors
export const transform: WalnutAxiosTransform = {
  // Here handler request logic
  requestInterceptors: (config) => {
    const userProfile = useAppStoreUserProfile()

    const isRequestAfterRefreshedToken = getBoolean(config._request_after_refresh_token, false)

    // avoid use ! below for ts
    if (!config.headers) {
      config.headers = {}
    }

    // if for demo purpose, just return
    if (config._demonstrate)
      return Promise.reject(new Error('Demonstrate'))

    // custom headers
    config.headers['x-language'] = appLocale.locale
    config.headers['x-fingerprint'] = fpId.value

    // location transform to base64
    if (userProfile.info?.city)
      config.headers['x-location'] = wbtoa(`${userProfile.info.country}-${userProfile.info.province}-${userProfile.info.city}-${userProfile.info.area}`)

    // a request doomed to fail
    if (config._error)
      config.headers['x-error'] = 1

    // sleep for a while
    if (config._sleep)
      config.headers['x-sleep'] = config._sleep

    // scoped permission in header
    if (config._scoped_permission)
      config.headers['x-scoped-permission'] = config._scoped_permission

    // carry token
    if (getBoolean(config._carryToken))
      userAuth.accessToken && setTokenHeader(config, userAuth.accessToken)

    // add timestamp
    if (config._timestamp && !isRequestAfterRefreshedToken) {
      if (config.params) {
        config.params = Object.assign(config.params, { t: Date.now() })
      }
      else {
        config.params = {
          t: Date.now(),
        }
      }
    }

    // transform "true"/"false" to true/false
    // when config.data exists
    // and this request is not the one after refresh token
    if (config._transformStringBoolean && config.data && !isRequestAfterRefreshedToken)
      config.data = easyTransformObjectStringBoolean(config.data)

    // auto encrypt body data(post)
    if (config?._autoEncryptRequestDataFields && config._autoEncryptRequestDataFields.length !== 0 && config.data && !isRequestAfterRefreshedToken) {
      const cryptedObj = Object.fromEntries(
        config._autoEncryptRequestDataFields.map(key => [
          key,
          AppRequestEncryption.encrypt(config.data[key]),
        ]),
      )

      config.data = merge(config.data, cryptedObj)
    }

    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },

  // Here handle response data
  responseInterceptors: async (res) => {
    // code below is custom code in `axios.response.data`
    const { code, data, msg } = res.data

    // normal success
    if (code === BussinessCodeConst.SUCCESS) {
      // auto decrypt response data with `crypto-js`
      if (res.config._autoDecryptResponseData)
        return Promise.resolve(AppResponseEncryption.decrypt(data))

      return Promise.resolve(data)
    }

    // when access token is expired, call refresh token api to get new token
    if (code === BussinessCodeConst.ACCESS_TOKEN_EXPIRED) {
      const config = res.config

      // TODO bug
      // router push too fast, which means last page going on requesting, then go to another page, will cause fake death of page
      return RefreshTokenLogic(config)
    }

    // refresh token is expired, so this user need to signout and re-signin
    if (code === BussinessCodeConst.REFRESH_TOKEN_EXPIRED) {
      await userAuth.Signout(false)
      return Promise.reject(new Error('Error'))
    }

    const badRequestCodeList: number[] = [
      BussinessCodeConst.SIGNIN_USER_NOT_FOUND,
      BussinessCodeConst.SIGNIN_PASS_NOT_VALID,
      BussinessCodeConst.SIGNIN_USER_BANNED,
      BussinessCodeConst.USER_EXIST,
      BussinessCodeConst.DATA_EXISTED,
      BussinessCodeConst.DATA_NOT_FOUND,
      BussinessCodeConst.DATA_DELETE_ERROR,
      BussinessCodeConst.DATA_ERROR,
      BussinessCodeConst.DATA_BAD_ID,
      BussinessCodeConst.VERIFY_CODE_ERROR,
      BussinessCodeConst.NOT_FOUND,
      BussinessCodeConst.DATABASE_ERROR,
      BussinessCodeConst.INTERNAL_SERVER,
      BussinessCodeConst.CUSTOM_ERROR,
      BussinessCodeConst.PERMISSION_DENIED,
    ]

    if (badRequestCodeList.includes(code)) {
      useAppNotiError(msg)
      return Promise.reject(new Error('Error'))
    }
  },

  // Here handle response error
  responseInterceptorsCatch: async (err) => {
    if (err.message === 'Network Error') {
      await useAppRouterPush({ name: '500' })
      return Promise.reject(err)
    }

    if (err.message === 'Demonstrate') {
      useAppNotiError(AppI18n.global.t('app.base.demonstrate'))
      return Promise.reject(err)
    }

    if (axios.isCancel(err))
      return Promise.reject(err)

    const statusCode: number = (err.response?.data as any).statusCode
    const msg: string = (err.response?.data as any).detail?.message
    await checkReponseErrorStatus(statusCode, msg)

    return Promise.reject(err)
  },
}
