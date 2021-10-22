import type { SigninPayloadType } from '../types/user'

import { getUserInfo, signin } from '/@/api/auth'
import { authName } from '/@/router/constant'
import { tabActionClear } from './tabs'
import { AppCoreFn1 } from '/@/core'

const { menu, token, user, auth } = useAppState()

/**
 * @description Action - User - Signin
 */
export const userActionSignin = async (payload: SigninPayloadType) => {
  const res = await signin(payload)

  // set token
  token.value = res.token

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

  await useRouterPush({ name: menu.indexMenuName })
}

/**
 * @description Action - User - Signout
 */
export const userActionSignOut = async () => {
  // clear token
  token.value = ''

  // push
  await useRouterPush({ name: authName })

  // clear tab
  setTimeout(() => {
    tabActionClear()
  }, 200)
}

/**
 * @description Action - User - getUserInfo
 */
export const userActionInfo = async () => {
  const res = await getUserInfo()

  user.userInfo = res
}
