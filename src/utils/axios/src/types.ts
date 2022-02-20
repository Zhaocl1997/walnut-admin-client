import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import type { SortOrder } from 'naive-ui/lib/data-table/src/interface'

/**
 * @description Custom transform type
 */
export interface AxiosTransform {
  /**
   * @description Axios original request interceptor
   */
  requestInterceptors?: (
    config: AxiosRequestConfigExtend
  ) => AxiosRequestConfig | Promise<RowData>

  /**
   * @description Axios original request error catch
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description Axios original response interceptor
   */
  responseInterceptors?: (
    res: AxiosResponse<BaseResponseStructure>
  ) => Promise<RowData>

  /**
   * @description Axios original response error catch
   */
  responseInterceptorsCatch?: (error: AxiosError) => void
}

/**
 * @description Custom config type
 */
export interface AxiosCustomConfig {
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

  /**
   * @description cached time, default is 5 seconds
   * @default 5000
   */
  cachedMiliseconds?: number

  /**
   * @description filter null value in data
   * @default true
   */
  filterNull?: boolean
}

/**
 * @description Axios options type
 */
export interface AxiosRequestConfigExtend extends AxiosRequestConfig {
  transform?: AxiosTransform
  customConfig?: AxiosCustomConfig
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
export interface BaseResponseStructure<T = RowData> {
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
 * @description Back list api response structure
 */
export interface BaseListResponse<T = RowData> {
  /**
   * @description List base structure
   */
  data: T[]

  /**
   * @description List total
   */
  total: number
}

/**
 * @description Back list api params structure
 */
export type BaseListParams<T = RowData> = {
  /**
   * @description query object
   */
  query?: T

  /**
   * @description sort object
   */
  sort?: BaseSortParams<T>

  /**
   * @description pagination object
   */
  page?: BasePageParams
}

/**
 * @description base sort params
 */
export type BaseSortParams<T = RowData> = {
  field: keyof T
  order: SortOrder
  priority: number
}[]

/**
 * @description base page params
 */
export type BasePageParams = {
  page?: number
  pageSize?: number
}
