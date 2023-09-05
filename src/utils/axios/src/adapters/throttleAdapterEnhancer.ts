import type { AxiosAdapter, AxiosPromise, AxiosRequestConfig } from 'axios'
import { LRUCache } from 'lru-cache'
import { buildSortedURL } from './utils'

interface RecordedCache {
  timestamp: number
  value?: AxiosPromise
}

const CAPACITY = 10

export const throttleAdapterEnhancerCache = new LRUCache<string, RecordedCache>({ max: CAPACITY })

export function throttleAdapterEnhancer(adapter: AxiosAdapter): AxiosAdapter {
  return async (config) => {
    const { url, method, params, paramsSerializer, _throttle } = config

    if (_throttle) {
      const recordCacheWithRequest = (index: string, config: AxiosRequestConfig) => {
        const responsePromise = (async () => {
          try {
            const response = await adapter(config)
            if (JSON.parse(response.data).code !== 2000) {
              throttleAdapterEnhancerCache.delete(index)
            }
            else {
              throttleAdapterEnhancerCache.set(index, {
                timestamp: Date.now(),
                value: Promise.resolve(response),
              })
            }
            return response
          }
          catch (reason) {
            throttleAdapterEnhancerCache.delete(index)
            throw reason
          }
        })()

        throttleAdapterEnhancerCache.set(index, {
          timestamp: Date.now(),
          value: responsePromise,
        })

        return responsePromise
      }

      const index = buildSortedURL(url, params, paramsSerializer)

      const now = Date.now()
      const cachedRecord = throttleAdapterEnhancerCache.get(index) || { timestamp: now }

      if (method === 'get') {
        if (now - cachedRecord.timestamp <= _throttle) {
          const responsePromise = cachedRecord.value

          if (responsePromise)

            return responsePromise
        }

        return recordCacheWithRequest(index, config)
      }
    }

    return await adapter(config)
  }
}
