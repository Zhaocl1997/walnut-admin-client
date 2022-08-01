enum AuthEnum {
  SIGNIN = '/auth/signin',
  SIGNOUT = '/auth/signout',
  SIGNUP = '/auth/signup',

  REFRESH_TOKEN = '/auth/refresh',

  PERMISSION = '/auth/permissions',
  PROFILE = '/auth/profile',
  KEYS = '/auth/keys',
}

/**
 * @description Sign in
 */
export const signin = (data: PasswordSigninPayload) => {
  return AppAxios.post<{
    access_token: string
    refresh_token: string
  }>(
    {
      url: AuthEnum.SIGNIN,
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
 * @description Refresh access_token use refresh_token
 */
export const refreshToken = (data: { refresh_token: string }) => {
  return AppAxios.post<{
    access_token: string
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
