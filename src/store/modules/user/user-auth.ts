import { defineStore } from 'pinia'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { authWithPwd, refreshToken, signout } from '@/api/auth'
import { authWithEmail } from '@/api/auth/email'
import { AppCoreFn1 } from '@/core'

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
    async ExcuteCoreFnAfterAuth(at: string, rt: string) {
      const userProfile = useAppStoreUserProfile()

      // set tokens
      this.setAccessToken(at)
      this.setRefreshToken(rt)

      const appMenu = useAppStoreMenu()

      // get menus/permissions/keys etc
      await AppCoreFn1()

      // push to the index menu
      await appMenu.goIndex()

      // send socket state
      AppSocket.emit(AppSocketEvents.SIGNIN, { visitorId: fpId.value, userId: userProfile.profile._id, userName: userProfile.profile.userName })
    },

    /**
     * @description password way to auth
     */
    async AuthWithBasicPassword(payload: AppPayloadAuth.Password) {
      const res = await authWithPwd({
        userName: payload.userName,
        password: payload.password,
      })

      // excute core fn
      await this.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)

      const { userName, password, rememberMe } = payload

      // remember me
      if (rememberMe)
        this.setRemember({ userName, password })
      else
        this.setRemember(undefined)
    },

    /**
     * @description email way to auth
     */
    async AuthWithEmailAddress(payload: AppPayloadAuth.EmailAddress) {
      const res = await authWithEmail(payload)

      // excute core fn
      await this.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)
    },

    /**
     * @description text message way to auth
     */
    async AuthWithPhoneNumber(payload: AppPayloadAuth.PhoneNumber) {
      const res = await authWithPhoneNumber(payload)

      // excute core fn
      await this.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)
    },

    /**
     * @description signout, need to clean lots of state
     */
    async Signout(callApi = true, fingerprint = fpId.value) {
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

      // send socket state
      AppSocket.emit(AppSocketEvents.SIGNOUT, fingerprint)

      useTimeoutFn(async () => {
        // push to signin page
        await useAppRouterPush({ name: AppAuthName })
      }, 200)
    },
  },
})

const useAppStoreUserAuthOutside = () => useAppStoreUserAuthInside(store)

export const useAppStoreUserAuth = () => {
  if (getCurrentInstance())
    return useAppStoreUserAuthInside()
  return useAppStoreUserAuthOutside()
}
