import type { SigninPayloadType } from '/@/store/types/user'

enum AuthEnum {
  SIGNIN = '/auth/signin',
  SIGNUP = '/auth/signup',

  PERMISSION = '/auth/permissions',
  PROFILE = '/auth/profile',
}

/**
 * @description Sign in
 */
export const signin = (data: SigninPayloadType) => {
  return AppAxios.post<{
    token: string
  }>({
    url: AuthEnum.SIGNIN,
    data,
  })
}

/**
 * @description Signin user permissions api
 */
export const getPermissions = () => {
  return AppAxios.get<AppSystemMenu[]>({
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
