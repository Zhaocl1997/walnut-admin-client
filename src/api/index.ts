import { AppAxios } from '/@/utils/axios'

export const HelloAPI = (cache = false) => {
  console.log(cache)

  return AppAxios.get(
    {
      url: '',
    },
    {
      needAuth: false,
      cache: cache,
    }
  )
}
