import {
  easyTransformObjectStringBoolean,
} from 'easy-fns-ts'
import { merge } from 'lodash-es'
import axios from 'axios'

import { AppRequestEncryption, AppResponseEncryption } from '../crypto'
import { checkReponseErrorStatus } from './checkStatus'
import { RefreshTokenLogic, setTokenHeader } from './refreshToken'
import { addToCancelPool, removeFromCancelPool } from './cancel'

const userAuth = useAppStoreUserAuth()
const appLocale = useAppStoreLocale()

const CancelToken = axios.CancelToken

// custom transform for req and res interceptors
export const transform: WalnutAxiosTransform = {
  // Here handler request logic
  requestInterceptors: (config) => {
    const userProfile = useAppStoreUserProfile()

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
    if (config._timestamp) {
      config.params = {
        t: Date.now(),
      }
    }

    // filter null value in config.data
    // if (mergedCustomOptions.filterNull && config.data)
    //   config.data = easyFilterEmptyValue(config.data)

    // transform "true"/"false" to true/false
    if (config._transformStringBoolean && config.data)
      config.data = easyTransformObjectStringBoolean(config.data)

    // auto encrypt body data(post)
    if (config?._autoEncryptRequestDataFields && config._autoEncryptRequestDataFields.length !== 0 && config.data) {
      const cryptedObj = Object.fromEntries(
        config._autoEncryptRequestDataFields.map(key => [
          key,
          AppRequestEncryption.encrypt(config.data[key]),
        ]),
      )

      config.data = merge(config.data, cryptedObj)
    }

    config.cancelToken = new CancelToken(c => addToCancelPool(config, c))

    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },

  // Here handle response data
  responseInterceptors: async (res) => {
    // code below is custom code in `axios.response.data`
    const { code, data, msg } = res.data

    // remove from the cancel pool
    removeFromCancelPool(res.config)

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
      return Promise.resolve()
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

    if (badRequestCodeList.includes(code))
      useAppNotiError(msg)

    // since we have the error message, just resolve so handle logic behind
    // return Promise.reject(new Error('Error'))

    // return Promise.reject(new Error('Error'))
  },

  // Here handle response error
  responseInterceptorsCatch: async (err) => {
    if (err.message === 'Network Error') {
      await useAppRouterPush({ name: '500' })
      return
    }

    if (err.message === 'Demonstrate') {
      useAppNotiError(AppI18n.global.t('app.base.demonstrate'))
      return
    }

    if (axios.isCancel(err))
      return

    console.log(err)

    const statusCode: number = (err.response?.data as any).statusCode
    const msg: string = (err.response?.data as any).detail?.message
    await checkReponseErrorStatus(statusCode, msg)

    return Promise.reject(err)
  },
}
