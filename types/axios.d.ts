import type { SortOrder } from 'naive-ui/lib/data-table/src/interface'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * carry token in header `Authorization Bearer`
         */
        _carryToken?: boolean

        /**
         * carry timestamp in query
         */
        _timestamp?: boolean

        /**
         * endpoints for demonstrate purpose which won't be sent for real
         */
        _demonstrate?: boolean

        /**
         * send a request doomed to be failed
         */
        _error?: boolean

        /**
         * sleep for milliseconds, need endpoint support
         */
        _sleep?: number

        /**
         * transform "true"/"false" to boolean true/false
         * only for shallow use and request data (mostly POST)
         */
        _transformStringBoolean?: boolean

        /**
         * scoped permissions usage, need endpoint support
         */
        _scoped_permission?: string

        /**
         * auto decrypt response data with `crypto-js`
         */
        _autoDecryptResponseData?: booloean

        /**
         * auto encrypt request data with `crypto-js`
         * specfic the fields wanna encrypt
         * only for shallow use and request data (mostly POST)
         */
        _autoEncryptRequestDataFields?: string[]

        /**
         * cache flag
         * optimised from https://github.com/kuitos/axios-extensions
         */
        _cache?: boolean

        /**
         * force to update the cache
         * optimised from https://github.com/kuitos/axios-extensions
         */
        _cache_force_update?: boolean

        /**
         * retry times
         * optimised from https://github.com/kuitos/axios-extensions
         */
        _retryTimes?: number

        /**
         * throttle miiliseconds
         * optimised from https://github.com/kuitos/axios-extensions
         */
        _throttle?: number

        /**
         * flag for the request(s) after excute the refresh token
         * mostly adapt for transformed request data/params
         * which should not excute part of the request interceptor again 
         * cause the data/params has already beed transformed in the first request that return access token expired
         * see more in axios folder
         */
        _request_after_refresh_token?: boolean
    }


}

declare global {
    interface WalnutAxiosConfig {
        originalConfig: AxiosRequestConfig
        extendConfig: WalnutAxiosTransform
    }

    /**
     * @description Custom transform type
     */
    interface WalnutAxiosTransform {
        /**
         * @description Axios original request interceptor
         */
        requestInterceptors?: (
            config: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<RowData>

        /**
         * @description Axios original request error catch
         */
        requestInterceptorsCatch?: (error: Error) => void

        /**
         * @description Axios original response interceptor
         */
        responseInterceptors?: (
            res: AxiosResponse<WalnutBaseResponseStructure>
        ) => Promise<RowData | void>

        /**
         * @description Axios original response error catch
         */
        responseInterceptorsCatch?: <T = any>(error: AxiosError<T>) => void
    }

    /**
     * @description Back end api base result structure
     */
    interface WalnutBaseResponseStructure<T = RowData> {
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
    interface WalnutBaseListResponse<T = RowData> {
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
     * @description base sort params
     */
    type WalnutBaseSortParams<T = RowData> = {
        field: keyof T
        order: SortOrder
        priority: number
    }[]

    /**
     * @description base page params
     */
    interface WalnutBasePageParams {
        page?: number
        pageSize?: number
    }


    /**
     * @description Back list api params structure
     */
    interface WalnutBaseListParams<T = RowData> {
        /**
         * @description query object
         */
        query?: T | null

        /**
         * @description sort object
         */
        sort?: WalnutBaseSortParams<T> | null

        /**
         * @description pagination object
         */
        page?: WalnutBasePageParams | null
    }
}

export { }