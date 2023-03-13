import type { AxiosRequestConfig } from 'axios'

export const HelloAPI = (config: AxiosRequestConfig) => {
  return AppAxios.get<string>(
    {
      url: '',
      ...config,
    },
  )
}

export const HelloAPIWithToken = (config: AxiosRequestConfig) => {
  return AppAxios.get<string>(
    {
      url: '/auth',
      ...config,
    },
  )
}
