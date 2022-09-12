enum AuthEnum {
  SIGNIN = '/auth/signin',
  SIGNUP_EMAIL = '/auth/signup/email',
  SIGNOUT = '/auth/signout',

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
 * @description Sign in
 */
export const signin = (data: AppAuth.Password) => {
  return AppAxios.post<AppTokenPayload>(
    {
      url: AuthEnum.SIGNIN,
      data,
    },
    { autoEncryptRequestData: true, encryptFields: ['password'] }
  )
}

/**
 * @description Sign up with email
 */
export const signupWithEmail = (data: AppAuth.EmailAddress) => {
  return AppAxios.post<AppTokenPayload>({
    url: AuthEnum.SIGNUP_EMAIL,
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
