// @ts-expect-error
import buildURL from 'axios/lib/helpers/buildURL'

export type ICacheLike<T> = {
  get: (key: string) => T | undefined
  set: (key: string, value: T) => void
} & ({ del: (key: string) => void } | { delete: (key: string) => void })

export function isCacheLike(cache: any): cache is ICacheLike<any> {
  return typeof cache.get === 'function' && typeof cache.set === 'function' && (typeof cache.delete === 'function' || typeof cache.del === 'function')
}

export function buildSortedURL(...args: any[]) {
  const builtURL = buildURL(...args)

  const [urlPath, queryString] = builtURL.split('?')

  if (queryString) {
    const paramsPair = queryString.split('&')
    return `${urlPath}?${paramsPair.sort().join('&')}`
  }

  return builtURL
}
