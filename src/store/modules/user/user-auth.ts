import { defineStore } from 'pinia'

import { refreshToken, signin, signout } from '/@/api/auth'
import { AppCoreFn1 } from '/@/core'
import { AppAuthName } from '/@/router/constant'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useUserAuthStoreInside = defineStore(StoreKeys.USER_AUTH, {
  state: (): UserAuthState => ({
    access_token: useAppStorage('access_token', ''),
    refresh_token: useAppStorage('refresh_token', ''),
    remember: useAppStorage('remember', {
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
      const appMenu = useAppMenuStore()

      const res = await signin(payload)

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
      await useRouterPush({ name: appMenu.indexMenuName })
    },

    /**
     * @description signout, need to clean lots of state
     */
    async Signout(callApi = true) {
      const userProfile = useUserProfileStore()
      const userPermission = useUserPermissionStore()
      const appMenu = useAppMenuStore()
      const appTab = useAppTabStore()

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
        useRouterPush({ name: AppAuthName })
      }, 200)
    },
  },
})

const useUserAuthStoreOutside = () => useUserAuthStoreInside(store)

export const useUserAuthStore = () => {
  if (getCurrentInstance()) return useUserAuthStoreInside()
  return useUserAuthStoreOutside()
}
