import type { SigninPayloadType } from '../types/user'

import { getUserInfo, signin } from '/@/api/auth'
import { STORAGE_AUTH, STORAGE_TOKEN } from '/@/utils/persistent'
import { authName, indexName, rootName } from '/@/router/constant'
import { tabActionClear } from './tabs'
import { menuActionPermissions } from './menu'

const setUserToken = (token: string) => {
  const { user } = useAppContext<false>()

  user.token = token

  STORAGE_TOKEN.value = token
}

const setUserInfo = (userInfo: Recordable) => {
  const { user } = useAppContext<false>()

  user.userInfo = userInfo
}

/**
 * @description Action - User - Signin
 */
export const userActionSignin = async (payload: SigninPayloadType) => {
  const res = await signin(payload)
  const { addRoute } = AppRouter

  setUserToken(res.token)

  const { username, password, rememberMe } = payload

  if (rememberMe) {
    STORAGE_AUTH.value = {
      username,
      password,
    }
  } else {
    STORAGE_AUTH.value = {}
  }

  // TODO
  const routes = await menuActionPermissions()

  routes.forEach((route) => {
    addRoute(rootName, route)
  })

  await useRouterPush({ name: indexName })
}

/**
 * @description Action - User - Signout
 */
export const userActionSignOut = () => {
  const { user } = useAppContext<false>()

  user.token = ''

  STORAGE_TOKEN.value = ''

  useRouterPush({ name: authName })

  setTimeout(() => {
    tabActionClear()
  }, 200)
}

/**
 * @description Action - User - getUserInfo
 */
export const userActionInfo = async () => {
  const res = await getUserInfo()

  setUserInfo(res)
}
