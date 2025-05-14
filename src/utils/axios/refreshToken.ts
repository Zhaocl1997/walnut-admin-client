import type { AxiosRequestConfig } from 'axios'

// flag to judge if calling refreshing token api
let isRefreshing = false
// waiting queue
let requestsQueue: ((token: string) => void)[] = []

const userAuth = useAppStoreUserAuth()

export function setTokenHeader(config: AxiosRequestConfig, token: string) {
  if (getBoolean(config._carryToken))
    config.headers!.Authorization = `Bearer ${token}`
}

export function RefreshTokenLogic(config: AxiosRequestConfig) {
  // not requesting for new access token
  if (!isRefreshing) {
    isRefreshing = true

    return userAuth
      .GetNewATWithRT()
      .then((newAccessToken) => {
        if (!newAccessToken)
          return

        setTokenHeader(config, newAccessToken)

        // token already refreshed, call the waiting request
        requestsQueue.forEach(cb => cb(newAccessToken))
        // clean queue
        requestsQueue = []

        return AppAxios.request(Object.assign(config, { _request_after_refresh_token: true }))
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
        setTokenHeader(config, t)
        resolve(AppAxios.request(config))
      })
    })
  }
}
