import type { SigninPayloadType } from '../store/types/user'
import { AuthEnum } from './enums'
import { AppAxios } from '/@/utils/axios'

export const signin = (params: SigninPayloadType) => {
  return AppAxios.request({
    method: 'POST',
    url: AuthEnum.SIGNIN,
    params,
  })
}

export const getPermissions = () => {
  return AppAxios.request({
    method: 'GET',
    url: AuthEnum.PERMISSION,
  })
}

export const getUserInfo = () => {
  return AppAxios.request({
    method: 'GET',
    url: AuthEnum.PROFILE,
  })
}
