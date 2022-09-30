import { defineStore } from 'pinia'

import { refreshToken, authWithPwd, signout } from '@/api/auth'
import { authWithEmail } from '@/api/auth/email'
import { AppCoreFn1 } from '@/core'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { authWithPhoneNumber } from '@/api/auth/phone'

const useAppStoreUserAuthInside = defineStore(StoreKeys.USER_AUTH, {
  state: (): UserAuthState => ({
    accessToken: useAppStorage(AppConstPersistKey.ACCESS_TOKEN, ''),
    refreshToken: useAppStorage(AppConstPersistKey.REFRESH_TOKEN, ''),
    remember: useAppStorage(AppConstPersistKey.REMEMBER, {
      userName: '',
      password: '',
    }),
  }),

  getters: {},

  actions: {
    setAccessToken(payload: string) {
      this.accessToken = payload
    },
    setRefreshToken(payload: string) {
      this.refreshToken = payload
    },
    setRemember(payload: AppPayloadAuth.Password | undefined) {
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
      const res = await refreshToken({ refreshToken: this.refreshToken! })

      this.setAccessToken(res?.accessToken)

      return res?.accessToken
    },

    /**
     * @description core function after signin to excute
     */
    async ExcuteCoreFnAfterAuth() {
      const appMenu = useAppStoreMenu()

      // get menus/permissions/keys etc
      await AppCoreFn1()

      // push to the index menu
      await appMenu.goIndex()
    },

    /**
     * @description password way to auth
     */
    async AuthWithBasicPassword(payload: AppPayloadAuth.Password) {
      const res = await authWithPwd({
        userName: payload.userName,
        password: payload.password,
      })

      // set tokens
      this.setAccessToken(res.accessToken)
      this.setRefreshToken(res.refreshToken)

      const { userName, password, rememberMe } = payload

      // remember me
      if (rememberMe) {
        this.setRemember({ userName, password })
      } else {
        this.setRemember(undefined)
      }

      // excute core fn
      this.ExcuteCoreFnAfterAuth()
    },

    /**
     * @description email way to auth
     */
    async AuthWithEmailAddress(payload: AppPayloadAuth.EmailAddress) {
      const res = await authWithEmail(payload)

      // set tokens
      this.setAccessToken(res.accessToken)
      this.setRefreshToken(res.refreshToken)

      // excute core fn
      this.ExcuteCoreFnAfterAuth()
    },

    /**
     * @description text message way to auth
     */
    async AuthWithPhoneNumber(payload: AppPayloadAuth.PhoneNumber) {
      const res = await authWithPhoneNumber(payload)

      // set tokens
      this.setAccessToken(res.accessToken)
      this.setRefreshToken(res.refreshToken)

      // excute core fn
      this.ExcuteCoreFnAfterAuth()
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
