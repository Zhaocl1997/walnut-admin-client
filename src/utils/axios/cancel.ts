import type { AxiosRequestConfig, Canceler } from 'axios'
import { buildSortedURL } from './src/adapters/utils'

export const cancelPools: { k: string; c: Canceler }[] = []

export const addToCancelPool = (config: AxiosRequestConfig, cancel: Canceler) => {
  const key = buildSortedURL(config.url, config.params, config.paramsSerializer)

  const index = cancelPools.findIndex(i => i.k === key)

  if (index === -1)
    cancelPools.push({ k: key, c: cancel })
  else
    cancelPools[index] = { k: key, c: cancel }
}

export const removeFromCancelPool = (config: AxiosRequestConfig, excuteCancel = false) => {
  const key = buildSortedURL(config.url, config.params, config.paramsSerializer)

  const index = cancelPools.findIndex(i => i.k === key)

  if (index !== -1) {
    excuteCancel && cancelPools[index].c()
    cancelPools.splice(index, 1)
  }
}

// cancel the latest request that do not receive a response
export const removeLatestRequest = () => {
  cancelPools.slice(-1)[0].c()
  cancelPools.splice(cancelPools.length - 1, 1)
}

// cancel all the request that currently do not have a response
export const removeAllCancel = () => {
  const newArr = cancelPools.filter(() => true)

  for (let i = 0; i < newArr.length; i++) {
    const element = newArr[i]
    element.c()
    cancelPools.splice(i, 1)
  }
}
