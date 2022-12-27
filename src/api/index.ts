import type { AxiosRequestConfig } from 'axios'

export const HelloAPI = (config: AxiosRequestConfig) => {
  return AppAxios.get<string>(
    {
      url: '',
      ...config,
    },
  )
}
