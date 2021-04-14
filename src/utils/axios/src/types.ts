import { AxiosRequestConfig } from 'axios'
import { AxiosTransform } from './transform'

export interface AxiosCustomOptions {
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
}

export interface AxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  customOptions?: AxiosCustomOptions
}
