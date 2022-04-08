import type { SigninPayloadType } from '../types/user'

import { getUserInfo, refreshToken, signin, signout } from '/@/api/auth'
import { AppAuthName } from '/@/router/constant'
import { clearTabs } from '/@/core/tab'
import { AppCoreFn1 } from '/@/core'
import { menuActionReset } from './menu'
import { AppAxiosEncryption } from '/@/utils/crypto'

const { menu, token, refresh_token, user, auth } = useAppState()

/**
 * @description Action - User - Signin
 */
export const userActionSignin = async (payload: SigninPayloadType) => {
  const params = {
    username: payload.username,
    password: AppAxiosEncryption.encrypt(payload.password)!,
  }

  const res = await signin(params)

  // set token
  token.value = res.access_token
  refresh_token.value = res.refresh_token

  const { username, password, rememberMe } = payload

  if (rememberMe) {
    auth.value = {
      username,
      password,
    }
  } else {
    auth.value = {}
  }

  await AppCoreFn1()

  await useRouterPush({ name: menu.value.indexMenuName })
}

/**
 * @description Action - User - Signout
 */
export const userActionSignOut = async (callApi = true) => {
  // call signout to remove refresh_token in db
  callApi && (await signout())

  // clear token
  token.value = ''
  refresh_token.value = ''

  // clear userinfo
  user.value.userInfo = {}

  // clear menu
  menuActionReset()

  // push
  await useRouterPush({ name: AppAuthName })

  // clear tab
  setTimeout(() => {
    clearTabs()
  }, 200)
}

/**
 * @description Action - User - getUserInfo
 */
export const userActionInfo = async () => {
  const res = await getUserInfo()

  user.value.userInfo = res
}

/**
 * @description Action - User - refresh token
 */
export const userActionRefreshToken = async () => {
  const res = await refreshToken({ refresh_token: refresh_token.value })

  token.value = res.access_token

  return res.access_token
}
