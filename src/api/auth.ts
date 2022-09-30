enum AuthEnum {
  PWD = '/auth/pwd',

  SIGNOUT = '/auth/pwd/signout',

  REFRESH_TOKEN = '/auth/refresh',

  PERMISSION = '/auth/permissions',
  PROFILE = '/auth/profile',
  KEYS = '/auth/keys',
}

/**
 * @description auth with pwd
 */
export const authWithPwd = (data: AppPayloadAuth.Password) => {
  return AppAxios.post<AppPayloadAuth.TokenPayload>(
    {
      url: AuthEnum.PWD,
      data,
    },
    { autoEncryptRequestData: true, encryptFields: ['password'] }
  )
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
 * @description Refresh accessToken use refreshToken
 */
export const refreshToken = (data: { refreshToken: string }) => {
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
  return AppAxios.get<{ user: AppSystemUser; roleNames: string[] }>({
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
