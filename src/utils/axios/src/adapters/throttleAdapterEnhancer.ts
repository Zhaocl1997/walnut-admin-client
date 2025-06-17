import type { AxiosAdapter, AxiosPromise, InternalAxiosRequestConfig } from 'axios'
import { LRUCache } from 'lru-cache'

interface RecordedCache {
  timestamp: number
  value?: AxiosPromise
}

const { axiosCache: cacheSeconds } = useAppEnvSeconds()

const CACHE_MINUTE = 1000 * cacheSeconds
const CAPACITY = 100
const throttleAdapterEnhancerCache = new LRUCache<string, RecordedCache>({ ttl: CACHE_MINUTE, max: CAPACITY })

export function throttleAdapterEnhancer(adapter: AxiosAdapter): AxiosAdapter {
  return async (config) => {
    const { url, method, params, paramsSerializer, _throttle } = config

    if (_throttle) {
      const recordCacheWithRequest = (index: string, config: InternalAxiosRequestConfig) => {
        const responsePromise = (async () => {
          try {
            const response = await adapter(config)
            if (JSON.parse(response.data).code !== BussinessCodeConst.SUCCESS) {
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
