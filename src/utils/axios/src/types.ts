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
  responseInterceptors?: (
    res: AxiosResponse<BaseResponseStructure>
  ) => Promise<any>

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
   * @default false
   */
  timestamp?: boolean

  /**
   * @description Carry token in the header
   * @default true
   */
  needAuth?: boolean

  /**
   * @description Is for demonstrate
   * @default false
   */
  demonstrate?: boolean

  /**
   * @description cached for same request
   * @default false
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

/**
 * @description Back end api base result structure
 */
export interface BaseResponseStructure<T = any> {
  /**
   * @description request code, not equal to axios `statusCode`. This is customizable code
   */
  code: number

  /**
   * @description messages for the request
   */
  msg: string

  /**
   * @description response data structure
   */
  data: T
}

/**
 * @description Back list api structure
 */
export interface BaseListResponse<T> {
  /**
   * @description List base structure
   */
  data: T[]

  /**
   * @description List total
   */
  total: number
}
