enum AuthEnum {
  PWD = '/auth/pwd',

  SIGNOUT = '/auth/signout',

  REFRESH_TOKEN = '/auth/refresh',

  PERMISSION = '/auth/permissions',
  PROFILE = '/auth/profile',
  KEYS = '/auth/keys',
}

/**
 * @description auth with pwd
 */
export function authWithPwdAPI(data: AppPayloadAuth.Password) {
  return AppAxios.post<AppPayloadAuth.TokenPayload>(
    {
      url: AuthEnum.PWD,
      data,
      _autoEncryptRequestDataFields: ['password'],
    },
  )
}

/**
 * @description Sign out
 */
export function signoutAPI() {
  return AppAxios.post({
    url: AuthEnum.SIGNOUT,
  })
}

/**
 * @description Refresh accessToken use refreshToken
 */
export function refreshTokenAPI(data: { refreshToken: string }) {
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
export function getPermissionsAPI() {
  return AppAxios.get<{
    permissionMenuTree: TreeNodeItem<Pick<AppSystemMenu, '_id' | 'pid' | 'show' | 'type' | 'title' | 'order' | 'path' | 'ternal' | 'name' | 'icon' | 'url' | 'menuActiveName' | 'badge' | 'activeIcon'>>[]
    permissionStrings: string[]
    permissionRouteTree: TreeNodeItem<RouteRecordRaw>[]
    keepAliveNames: string[]
    indexMenuName: string
    affixedTabs: AppTab[]
    internalIframeList: { name: string, url: string, cache: boolean }[]
  }>({
    url: AuthEnum.PERMISSION,
  })
}

/**
 * @description Signin user detail info api
 */
export function getUserInfoAPI() {
  return AppAxios.get<{ user: AppSystemUser, roleNames: string[] }>({
    url: AuthEnum.PROFILE,
  })
}

/**
 * @description get baidu ak from backend
 */
export function getBaiduKeyAPI() {
  return AppAxios.get<AppSecretKeysInterface>(
    {
      url: AuthEnum.KEYS,
      _autoDecryptResponseData: true,
      _cache: true,
    },
  )
}
