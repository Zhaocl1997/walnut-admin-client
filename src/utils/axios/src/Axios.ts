import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import type {
  AxiosRequestConfigExtend,
  AxiosTransform,
  AxiosCustomConfig,
} from './types'

import axios from 'axios'

import { easyDeepMerge } from 'easy-fns-ts'

export class Axios {
  private instance: AxiosInstance
  private readonly options: AxiosRequestConfigExtend

  constructor(options: AxiosRequestConfigExtend) {
    this.options = options

    this.instance = axios.create(options)
    this.createInterceptors()
  }

  /**
   * @description get `transform` from options
   */
  private getTransform() {
    const { transform } = this.options
    return transform!
  }

  /**
   * @description create request/response interceptors
   */
  private createInterceptors() {
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
  private createRequestInterceptor(interceptor: any, error: any) {
    this.instance.interceptors.request.use(interceptor, error)
  }

  /**
   * @description create response interceptors
   */
  private createResponseInterceptor(interceptor: any, error: any) {
    this.instance.interceptors.response.use(interceptor, error)
  }

  /**
   * @description base request method
   */
  request<T>(
    config: AxiosRequestConfig,
    options?: AxiosCustomConfig
  ): Promise<T> {
    // Here merge default customConfig with individual customConfig
    const mergedConfig = easyDeepMerge<AxiosRequestConfig>(config, {
      customConfig: options,
    })

    return new Promise((resolve, reject) => {
      this.instance
        .request<T, T>(mergedConfig!)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  /**
   * @description Axios Cancel Request
   */
  isCancel(err: AxiosError) {
    return axios.isCancel(err)
  }

  /**
   * @description Axios Get
   */
  get<T>(config: AxiosRequestConfig, options?: AxiosCustomConfig) {
    return this.request<T>({ ...config, method: 'GET' }, options)
  }

  /**
   * @description Axios Post
   */
  post<T>(config: AxiosRequestConfig, options?: AxiosCustomConfig) {
    return this.request<T>({ ...config, method: 'POST' }, options)
  }

  /**
   * @description Axios Put
   */
  put<T>(config: AxiosRequestConfig, options?: AxiosCustomConfig) {
    return this.request<T>({ ...config, method: 'PUT' }, options)
  }

  /**
   * @description Axios Delete
   */
  delete<T>(config: AxiosRequestConfig, options?: AxiosCustomConfig) {
    return this.request<T>({ ...config, method: 'DELETE' }, options)
  }
}
