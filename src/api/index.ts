import { AppAxios } from '/@/utils/axios'

export const HelloAPI = () => {
  return AppAxios.get(
    {
      url: '',
    },
    {
      needAuth: false,
      throttle: true,
    }
  )
}
