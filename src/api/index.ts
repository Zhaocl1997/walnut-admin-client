import { AppAxios } from '/@/utils/axios'

export const HelloAPI = (cache = false) => {
  return AppAxios.get<{
    text: string
  }>(
    {
      url: '',
    },
    {
      needAuth: false,
      cache: cache,
    }
  )
}
