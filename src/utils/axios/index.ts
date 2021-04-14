import { capsuleLog } from 'easy-fns-ts'

import { getToken } from '../auth'
import { appName } from '../constant/prefix'
import { checkReponseErrorStatus } from './checkStatus'
import { Axios } from './src/Axios'
import { AxiosTransform } from './src/transform'

const transform: AxiosTransform = {
  requestInterceptors: (config) => {
    if (config.customOptions?.needAuth) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },

  responseInterceptors: (res) => {
    capsuleLog({ title: `[${appName} Request]`, info: 'Success' })
    return Promise.resolve(res.data)
  },

  responseInterceptorsCatch: (err) => {
    try {
      const statusCode = err.response!.data.statusCode
      const msg = err.response!.data.detail.message
      checkReponseErrorStatus(statusCode, msg)

      capsuleLog({
        title: `[${appName} Request]`,
        info: 'Error',
        type: 'danger',
      })
      return Promise.reject(err)
    } catch (error) {
      checkReponseErrorStatus()
    }
  },
}

export const AppAxios = new Axios({
  baseURL: `${import.meta.env.VITE_PROXY}/${import.meta.env.VITE_API_PREFIX}/v${
    import.meta.env.VITE_API_VERSION
  }`,

  timeout: 10 * 1000,

  transform,

  customOptions: {
    timestamp: false,
    needAuth: true,
  },
})
