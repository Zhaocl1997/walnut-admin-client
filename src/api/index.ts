import { AppAxios } from '/@/utils/axios'

export const HelloAPI = () => {
  return AppAxios.request({
    method: 'GET',
    url: '',
    customOptions: {
      needAuth: false,
    },
  })
}
