import axios, { AxiosInstance } from 'axios'
import { easyDeepMerge, isFunction } from 'easy-fns-ts'
import { ElNotification } from 'element-plus'
import { AxiosTransform } from './transform'
import { AxiosOptions } from './types'

export class Axios {
  private instance: AxiosInstance
  private readonly options: AxiosOptions

  constructor(options: AxiosOptions) {
    this.options = options

    this.instance = axios.create(options)
    this.createInterceptors()
  }

  /**
   * @description get `transform` from options
   */
  getTransform() {
    const { transform } = this.options
    return transform!
  }

  /**
   * @description create request/response interceptors
   */
  createInterceptors() {
    const transform: AxiosTransform = this.getTransform()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    this.createRequestInterceptor(requestInterceptors, requestInterceptorsCatch)
    this.createResponseInterceptor(
      responseInterceptors,
      responseInterceptorsCatch
    )
  }

  /**
   * @description create request interceptors
   */
  createRequestInterceptor(interceptor: any, error: any) {
    this.instance.interceptors.request.use(interceptor, error)
  }

  /**
   * @description create response interceptors
   */
  createResponseInterceptor(interceptor: any, error: any) {
    this.instance.interceptors.response.use(interceptor, error)
  }

  /**
   * @description base request method
   */
  request(config: AxiosOptions) {
    const { customOptions } = config
    const { customRequestInterceptor } = this.getTransform()

    if (customRequestInterceptor && isFunction(customRequestInterceptor)) {
      config = customRequestInterceptor(
        easyDeepMerge(this.options.customOptions, customOptions)
      )
    }

    // TODO when got permission func, remove
    if (config.customOptions?.demonstrate) {
      ElNotification({ type: 'warning', message: 'Demonstrate Only!' })
      return Promise.reject()
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }
}
