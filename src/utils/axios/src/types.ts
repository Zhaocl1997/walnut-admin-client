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
  ) => Promise<RowData | void>

  /**
   * @description Axios original response error catch
   */
  responseInterceptorsCatch?: <T = any>(error: AxiosError<T>) => void
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
   * @description cached for same request
   * @default false
   */
  cache?: boolean

  /**
   * @description cached time, default is 5 seconds
   */
  cachedSeconds?: number

  /**
   * @description filter null value in data
   * @default true
   */
  filterNull?: boolean

  /**
   * @description transform "true"/"false" to true/false
   * @default true
   */
  transformStringBoolean?: boolean

  /**
   * @description auto decrypt the sensitive-encrypted data fetched from backend
   * @default false
   */
  autoDecryptResponseData?: boolean

  /**
   * @description auto encrypt the sensitive data in post method
   * @default false
   */
  autoEncryptRequestData?: boolean

  /**
   * @description pick field to encrypt
   */
  encryptFields?: string[]
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
  cachedSeconds?: number
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
  query?: T | null

  /**
   * @description sort object
   */
  sort?: BaseSortParams<T> | null

  /**
   * @description pagination object
   */
  page?: BasePageParams | null
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
