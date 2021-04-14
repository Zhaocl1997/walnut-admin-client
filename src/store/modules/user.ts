import type { Module } from 'vuex'
import type { UserModuleState, StoreState } from '../types'

import { signin, getUserInfo } from '/@/api/auth'
import { useRouterPush } from '/@/router'
import { AppStore } from '/@/store'

import { MutatationEnum } from '/@/enums/mutation'
import { PersistentKeysEnum } from '/@/enums/persistent'

import { getToken, setToken, removeToken } from '/@/utils/auth'
import { setLocal } from '/@/utils/persistent'
import { authName, indexName } from '/@/router/constant'

export interface SigninPayload {
  username: string
  password: string
  rememberMe: boolean
}

export const userModule: Module<UserModuleState, StoreState> = {
  namespaced: true,

  state: {
    token: getToken(),
    userInfo: {},
  },

  mutations: {
    [MutatationEnum.SET_TOKEN]: (state, token) => {
      state.token = token
      setToken(token)
    },

    [MutatationEnum.SET_USERINFO]: (state, info) => {
      state.userInfo = info
    },
  },

  actions: {
    async SignIn({ commit }, payload: SigninPayload) {
      const res = await signin(payload)

      commit(MutatationEnum.SET_TOKEN, (res as any).token)

      const { username, password, rememberMe } = payload
      if (rememberMe) {
        setLocal(PersistentKeysEnum.USER_USERNAME, username)
        setLocal(PersistentKeysEnum.USER_PASSWORD, password)
      }

      useRouterPush({ name: indexName })
    },

    SignOut({ commit }) {
      const { dispatch } = AppStore

      commit(MutatationEnum.SET_TOKEN, '')
      removeToken()
      useRouterPush({ name: authName })

      setTimeout(() => {
        dispatch('tab/commitClearTab')
      }, 200)
    },

    async commitUserInfo({ commit }) {
      const res = await getUserInfo()

      commit(MutatationEnum.SET_USERINFO, res)
    },
  },
}
