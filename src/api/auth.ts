import type { Menu } from '/@/router/types'
import type { SigninPayloadType } from '/@/store/types/user'
import type { BaseListResponse } from '/@/utils/axios'

import { AppAxios } from '/@/utils/axios'

enum AuthEnum {
  SIGNIN = '/auth/signin',
  SIGNUP = '/auth/signup',

  PERMISSION = '/auth/permissionMenus',
  PROFILE = '/auth/profile',
}

/**
 * @description Sign in
 */
export const signin = (params: SigninPayloadType) => {
  return AppAxios.post<{
    token: string
  }>({
    url: AuthEnum.SIGNIN,
    params,
  })
}

/**
 * @description Signin user permissions api
 */
export const getPermissions = () => {
  return AppAxios.get<BaseListResponse<Menu>>({
    url: AuthEnum.PERMISSION,
  })
}

/**
 * @description Signin user detail info api
 */
export const getUserInfo = () => {
  return AppAxios.get<{
    role: string
    userId: string
    username: string
  }>({
    url: AuthEnum.PROFILE,
  })
}
