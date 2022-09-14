enum AuthEnum {
  PWD = '/auth/pwd',
  EMAIL = '/auth/email',

  SIGNOUT = '/auth/pwd/signout',

  REFRESH_TOKEN = '/auth/refresh',

  PERMISSION = '/auth/permissions',
  PROFILE = '/auth/profile',
  KEYS = '/auth/keys',
}

interface AppTokenPayload {
  accessToken: string
  refreshToken: string
}

/**
 * @description auth with pwd
 */
export const authWithPwd = (data: AppAuth.Password) => {
  return AppAxios.post<AppTokenPayload>(
    {
      url: AuthEnum.PWD,
      data,
    },
    { autoEncryptRequestData: true, encryptFields: ['password'] }
  )
}

/**
 * @description auth with email
 */
export const authWithEmail = (data: AppAuth.EmailAddress) => {
  return AppAxios.post<AppTokenPayload>({
    url: AuthEnum.EMAIL,
    data,
  })
}

/**
 * @description Sign out
 */
export const signout = () => {
  return AppAxios.post({
    url: AuthEnum.SIGNOUT,
  })
}

/**
 * @description Refresh accessToken use refresh_token
 */
export const refreshToken = (data: { refresh_token: string }) => {
  return AppAxios.post<{
    accessToken: string
  }>({
    url: AuthEnum.REFRESH_TOKEN,
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
  return AppAxios.get<AppSystemUser>({
    url: AuthEnum.PROFILE,
  })
}

/**
 * @description get some sensitive keys from backend
 */
export const getSecretKeys = () => {
  return AppAxios.get<AppSecretKeysInterface>(
    {
      url: AuthEnum.KEYS,
    },
    { autoDecryptResponseData: true }
  )
}
