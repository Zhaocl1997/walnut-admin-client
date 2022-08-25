import { defineStore } from 'pinia'

import { refreshToken, signin, signout } from '@/api/auth'
import { AppCoreFn1 } from '@/core'
import { AppAuthName } from '@/router/constant'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserAuthInside = defineStore(StoreKeys.USER_AUTH, {
  state: (): UserAuthState => ({
    access_token: useAppStorage(AppConstPersistKey.ACCESS_TOKEN, ''),
    refresh_token: useAppStorage(AppConstPersistKey.REFRESH_TOKEN, ''),
    remember: useAppStorage(AppConstPersistKey.REMEMBER, {
      userName: '',
      password: '',
    }),
  }),

  getters: {},

  actions: {
    setAccessToken(payload: string) {
      this.access_token = payload
    },
    setRefreshToken(payload: string) {
      this.refresh_token = payload
    },
    setRemember(payload: PasswordSigninPayload | undefined) {
      this.remember = payload
    },

    clearTokens() {
      this.setAccessToken('')
      this.setRefreshToken('')
    },

    /**
     * @description get new access token use refresh token
     */
    async GetNewATWithRT(): Promise<string> {
      const res = await refreshToken({ refresh_token: this.refresh_token! })

      this.setAccessToken(res.access_token)

      return res.access_token
    },

    /**
     * @description basic signin with userName and password
     */
    async SignInWithPassword(payload: PasswordSigninPayload) {
      const appMenu = useAppStoreMenu()

      const res = await signin({
        userName: payload.userName,
        password: payload.password,
      })

      // set tokens
      this.setAccessToken(res.access_token)
      this.setRefreshToken(res.refresh_token)

      const { userName, password, rememberMe } = payload

      // remember me
      if (rememberMe) {
        this.setRemember({ userName, password })
      } else {
        this.setRemember(undefined)
      }

      // get menus/permissions/keys etc
      await AppCoreFn1()

      // push to the index menu
      await appMenu.goIndex()
    },

    /**
     * @description signout, need to clean lots of state
     */
    async Signout(callApi = true) {
      const userProfile = useAppStoreUserProfile()
      const userPermission = useAppStoreUserPermission()
      const appMenu = useAppStoreMenu()
      const appTab = useAppStoreTab()

      // call signout to remove refresh_token in db
      callApi && (await signout())

      // clear tokens
      this.clearTokens()

      // clear user profile
      userProfile.clearProfile()

      // clear menus
      appMenu.clearMenus()

      // clear permissions
      userPermission.clearPermissions()

      // clear tab
      appTab.clearTabs()

      useTimeoutFn(() => {
        // push to signin page
        useAppRouterPush({ name: AppAuthName })
      }, 200)
    },
  },
})

const useAppStoreUserAuthOutside = () => useAppStoreUserAuthInside(store)

export const useAppStoreUserAuth = () => {
  if (getCurrentInstance()) return useAppStoreUserAuthInside()
  return useAppStoreUserAuthOutside()
}
