import type { AxiosOptions, AxiosTransform } from './src/types'

import { ElNotification } from 'element-plus'
import axios from 'axios'

import { checkReponseErrorStatus } from './checkStatus'
import { Axios } from './src/Axios'
import { getToken } from '../auth'

const pending: { u: string; f: Fn }[] = [] //声明一个数组用于存储每个请求的取消函数和axios标识
const cancelToken = axios.CancelToken
const removePending = (config) => {
  console.log('pending', pending)
  for (const p in pending) {
    if (pending[p].u === config.url.split('?')[0] + '&' + config.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f() //执行取消操作
      pending.splice(p, 1) //数组移除当前请求
    }
  }
}

const transform: AxiosTransform = {
  requestInterceptors: (config) => {
    const mergedCustomOptions = config.customOptions!

    // carry token
    if (mergedCustomOptions.needAuth) {
      getToken() && (config.headers['Authorization'] = `Bearer ${getToken()}`)
    }

    // Demonstrate purpose API
    if (mergedCustomOptions.demonstrate) {
      return Promise.reject(new Error('Demonstrate'))
    }

    // Throttle request
    if (mergedCustomOptions.throttle) {
      removePending(config)

      config.cancelToken = new cancelToken((c) => {
        // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
        pending.push({
          u: config.url!.split('?')[0] + '&' + config.method,
          f: c,
        }) //config.data为请求参数
      })
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
    if (AppAxios.isCancel(err)) {
      console.log(1, err)

      throw new Error('cancelled')
    } else if (err.message === 'Demonstrate') {
      ElNotification({ type: 'warning', message: 'Demonstrate Only!' })
      return Promise.reject(err)
    } else if (err.response) {
      const statusCode = err.response!.data.statusCode
      const msg = err.response!.data.detail.message
      checkReponseErrorStatus(statusCode, msg)
    }
  },
}

const axiosConfig: AxiosOptions = {
  baseURL: `${import.meta.env.VITE_PROXY}/${import.meta.env.VITE_API_PREFIX}/v${
    import.meta.env.VITE_API_VERSION
  }`,

  timeout: 10 * 1000,

  transform,

  // Timestamp default false
  // Need auth default
  customOptions: {
    timestamp: false,
    needAuth: true,
  },
}

export const AppAxios = new Axios(axiosConfig)

// export const AppAxios = new Axios({
//   baseURL: `${import.meta.env.VITE_PROXY}/${import.meta.env.VITE_API_PREFIX}/v${
//     import.meta.env.VITE_API_VERSION
//   }`,

//   timeout: 10 * 1000,

//   transform,

//   // Timestamp default false
//   // Need auth default
//   customOptions: {
//     timestamp: false,
//     needAuth: true,
//   },
// })
