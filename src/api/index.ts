import type { AxiosRequestConfig } from 'axios'

export function HelloAPI(config: AxiosRequestConfig) {
  return AppAxios.get<string>(
    {
      url: '',
      ...config,
    },
  )
}

export function HelloAPIWithToken(config: AxiosRequestConfig) {
  return AppAxios.get<string>(
    {
      url: '/auth',
      ...config,
    },
  )
}
