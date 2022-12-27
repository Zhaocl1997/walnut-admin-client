import type { AxiosAdapter, AxiosPromise } from 'axios'
import LRUCache from 'lru-cache'
import { buildSortedURL } from './utils'

const FIVE_MINUTES = 1000 * 60 * 5
const CAPACITY = 100

export const cacheAdapterEnhancerCache = new LRUCache<string, AxiosPromise>({ ttl: FIVE_MINUTES, max: CAPACITY })

export function cacheAdapterEnhancer(adapter: AxiosAdapter): AxiosAdapter {
  return (config) => {
    const { url, method, params, paramsSerializer, _cache, _cache_force_update } = config

    if (method === 'get' && _cache) {
      const cache = cacheAdapterEnhancerCache

      // build the index according to the url and params
      const index = buildSortedURL(url, params, paramsSerializer)

      let responsePromise = cache.get(index)

      if (!responsePromise || _cache_force_update) {
        responsePromise = (async () => {
          try {
            const response = await adapter(config)
            if (JSON.parse(response.data).code !== 2000)
              cache.delete(index)

            return response
          }
          catch (reason) {
            cache.delete(index)
            throw reason
          }
        })()

        // put the promise for the non-transformed response into cache as a placeholder
        cache.set(index, responsePromise)

        return responsePromise
      }

      return responsePromise
    }

    return adapter(config)
  }
}
