import type { AxiosRequestConfig } from 'axios'
import type { AxiosRequestConfigExtend } from './src/types'

// flag to judge if calling refreshing token api
let isRefreshing = false
// waiting queue
let requestsQueue: ((token: string) => void)[] = []

export const setTokenInRequest = (
  config: AxiosRequestConfigExtend,
  token: string,
) => {
  config.headers!.Authorization = `Bearer ${token}`
}

const userAuth = useAppStoreUserAuth()

export const RefreshTokenLogic = (config: AxiosRequestConfig) => {
  // not requesting for new access token
  if (!isRefreshing) {
    isRefreshing = true

    return userAuth
      .GetNewATWithRT()
      .then((refresh_token) => {
        if (!refresh_token)
          return

        setTokenInRequest(config, refresh_token)

        // token already refreshed, call the waiting request
        requestsQueue.forEach(cb => cb(refresh_token))
        // clean queue
        requestsQueue = []

        // add customConfig
        // @ts-expect-error
        return AppAxios.request(config, config.customConfig)
      })
      .finally(() => {
        isRefreshing = false
      })
  }
  else {
    // when refreshing token, return a promise that haven't called resolve
    return new Promise((resolve) => {
      // push resolve into queue, using an anonymous function to wrap it. ASAP token refresh is done, excute
      requestsQueue.push((t) => {
        setTokenInRequest(config, t)
        resolve(AppAxios.request(config))
      })
    }).finally(() => {
      isRefreshing = false
    })
  }
}
