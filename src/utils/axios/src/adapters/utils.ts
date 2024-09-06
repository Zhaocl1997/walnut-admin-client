// @ts-expect-error
import buildURL from 'axios/lib/helpers/buildURL'

export function buildSortedURL(...args: any[]) {
  const builtURL = buildURL(...args) ?? 'root-endpoint'
  
  const [urlPath, queryString] = builtURL.split('?')

  if (queryString) {
    const paramsPair = queryString.split('&')
    return `${urlPath}?${paramsPair.sort().join('&')}`
  }

  return builtURL
}
