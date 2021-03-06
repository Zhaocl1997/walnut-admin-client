import type { SigninPayloadType } from '../types/user'

import { useAppContext } from '/@/App'
import { getUserInfo, signin } from '/@/api/auth'
import { PersistentKeysEnum } from '/@/enums/persistent'
import { removeToken, setToken } from '/@/utils/auth'
import { setLocal } from '/@/utils/persistent'
import { useRouterPush } from '/@/router'
import { authName, indexName } from '/@/router/constant'
import { tabActionClear } from './tabs'

const setUserToken = (token: string) => {
  const { user } = useAppContext<false>()

  user.token = token
  setToken(token)
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

  setUserToken(res.token)

  const { username, password, rememberMe } = payload

  if (rememberMe) {
    setLocal(PersistentKeysEnum.USER_USERNAME, username)
    setLocal(PersistentKeysEnum.USER_PASSWORD, password)
  }

  useRouterPush({ name: indexName })
}

/**
 * @description Action - User - Signout
 */
export const userActionSignOut = () => {
  const { user } = useAppContext<false>()

  user.token = ''

  removeToken()

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
