import type { SigninPayloadType } from '../store/types/user'
import { AuthEnum } from './enums'
import { AppAxios } from '/@/utils/axios'

export const signin = (params: SigninPayloadType) => {
  return AppAxios.post({
    url: AuthEnum.SIGNIN,
    params,
  })
}

export const getPermissions = () => {
  return AppAxios.get({
    url: AuthEnum.PERMISSION,
  })
}

export const getUserInfo = () => {
  return AppAxios.get({
    url: AuthEnum.PROFILE,
  })
}
