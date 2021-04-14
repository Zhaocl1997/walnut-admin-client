import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosCustomOptions, AxiosOptions } from './types'

export interface AxiosTransform {
  /**
   * @description req interceptor
   */
  customRequestInterceptor?: (config: AxiosCustomOptions) => AxiosOptions

  /**
   * @description req interceptor
   */
  requestInterceptors?: (
    config: AxiosOptions
  ) => AxiosRequestConfig | Promise<any>

  /**
   * @description req error catch
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description res interceptor
   */
  responseInterceptors?: (res: AxiosResponse) => Promise<AxiosResponse>

  /**
   * @description res error catch
   */
  responseInterceptorsCatch?: (error: AxiosError) => void
}
