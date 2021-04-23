import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

/**
 * @description Custom options type
 */
export interface customRequestOptions {
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
   * @description Same request merged into one
   */
  throttle?: boolean
}

/**
 * @description Axios options type
 */
export interface AxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  customOptions?: customRequestOptions
}

/**
 * @description Custom transform type
 */
export interface AxiosTransform {
  /**
   * @description Axios original request interceptor
   */
  requestInterceptors?: (
    config: AxiosOptions
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
