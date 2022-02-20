import type { AxiosAdapter, AxiosRequestConfig } from 'axios'
import type { AxiosAdapterOptions, AxiosRequestConfigExtend } from './types'

import { Memory } from '../../memory'

const httpMempry = new Memory<any, any>()

/**
 * @description generate request key
 */
const generateReqKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * @description create memory for same request. Default only work for `get` method
 */
export const cacheAdapterEnhancer = (
  adapter: AxiosAdapter,
  options?: AxiosAdapterOptions
) => {
  const { maxAge } = options!

  return (config: AxiosRequestConfigExtend) => {
    const { method, customConfig } = config

    const { cache, cachedMiliseconds } = customConfig!

    // designed by only get request will be cached
    if (method === 'get' && cache) {
      const requestKey = generateReqKey(config)

      let responsePromise = httpMempry.get(requestKey)

      if (!responsePromise) {
        responsePromise = (async () => {
          try {
            return await adapter(config)
          } catch (reason) {
            httpMempry.remove(requestKey)
            throw reason
          }
        })()

        httpMempry.set(requestKey, responsePromise, cachedMiliseconds ?? maxAge)
        return responsePromise
      }

      return responsePromise
    }

    return adapter(config)
  }
}
