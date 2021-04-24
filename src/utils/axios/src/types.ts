import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

/**
 * @description Custom transform type
 */
export interface AxiosTransform {
  /**
   * @description Axios original request interceptor
   */
  requestInterceptors?: (
    config: AxiosRequestConfigExtend
  ) => AxiosRequestConfig | Promise<any>

  /**
   * @description Axios original request error catch
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description Axios original response interceptor
   */
  responseInterceptors?: (res: AxiosResponse) => Promise<AxiosResponse>

  /**
   * @description Axios original response error catch
   */
  responseInterceptorsCatch?: (error: AxiosError) => void
}

/**
 * @description Custom config type
 */
export interface customConfigType {
  /**
   * @description Add timestamp in the url
   */
  timestamp?: boolean

  /**
   * @description Carry token in the header
   */
  needAuth?: boolean

  /**
   * @description Is for demonstrate
   */
  demonstrate?: boolean

  /**
   * @description cached for same request
   */
  cache?: boolean
}

/**
 * @description Axios options type
 */
export interface AxiosRequestConfigExtend extends AxiosRequestConfig {
  transform?: AxiosTransform
  customConfig?: customConfigType
}

/**
 * @description Axios custom adapter options
 */
export interface AxiosAdapterOptions {
  /**
   * @description cache max age.
   */
  maxAge?: number
}
