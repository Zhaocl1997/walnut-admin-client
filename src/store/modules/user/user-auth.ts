import { authWithPwdAPI, refreshTokenAPI, signoutAPI } from '@/api/auth'

import { authWithEmailAPI } from '@/api/auth/email'
import { authWithPhoneNumberAPI } from '@/api/auth/phone'
import { AppCoreFn1 } from '@/core'
import { AppRootRoute } from '@/router/routes/builtin'
import { defineStore } from 'pinia'

import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserAuthInside = defineStore(StoreKeys.USER_AUTH, {
  state: (): IUserStoreAuth => ({
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
      const { accessToken } = await refreshTokenAPI({ refreshToken: this.refreshToken! })

      this.setAccessToken(accessToken)

      return accessToken
    },

    /**
     * @description refresh AT and permission after switch role
     */
    async ExcuteAfterSwitchRole() {
      const accessToken = await this.GetNewATWithRT()

      // remove root route will remove all it's children
      AppRouter.removeRoute(AppRootRoute.name!)
      AppRouter.addRoute(AppRootRoute)

      await this.ExcuteCoreFnAfterAuth(accessToken, this.refreshToken!)
    },

    /**
     * @description core function after signin to excute
     */
    async ExcuteCoreFnAfterAuth(at: string, rt: string) {
      const userProfile = useAppStoreUserProfile()
      const appMenu = useAppStoreMenu()

      // set tokens
      this.setAccessToken(at)
      this.setRefreshToken(rt)

      // get user profile
      await userProfile.getProfile()

      // get menus/permissions/keys etc
      await AppCoreFn1()

      // send beacon
      sendUserMonitorBeacon({ userId: userProfile.profile._id, auth: true })

      // push to the index menu
      await appMenu.goIndex()
    },

    /**
     * @description password way to auth
     */
    async AuthWithBasicPassword(payload: AppPayloadAuth.Password) {
      const res = await authWithPwdAPI({
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
      const res = await authWithEmailAPI(payload)

      // excute core fn
      await this.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)
    },

    /**
     * @description text message way to auth
     */
    async AuthWithPhoneNumber(payload: AppPayloadAuth.PhoneNumber) {
      const res = await authWithPhoneNumberAPI(payload)

      // excute core fn
      await this.ExcuteCoreFnAfterAuth(res.accessToken, res.refreshToken)
    },

    /**
     * @description signout, need to clean lots of state
     */
    async Signout(callApi = true) {
      const userProfile = useAppStoreUserProfile()
      const userPermission = useAppStoreUserPermission()
      const appMenu = useAppStoreMenu()
      const appTab = useAppStoreTab()
      const appCapJSToken = useAppStoreCapJSToken()

      // call signout to remove refresh_token
      if (callApi) {
        await signoutAPI()
      }

      // clear tokens
      this.clearTokens()

      // clear capjs token
      appCapJSToken.$reset()

      // clear user profile
      userProfile.$reset()

      // clear menus
      appMenu.$reset()

      // clear permissions
      userPermission.$reset()

      // clear tab
      appTab.$reset()

      // disconnect socket
      socketService.destroy()

      // send beacon
      sendUserMonitorBeacon({ userId: null, auth: false })

      const id = setTimeout(async () => {
        // push to signin page
        await useAppRouterPush({ name: AppAuthName, replace: true, force: true })
        clearTimeout(id)
      }, 200)
    },
  },
})

const useAppStoreUserAuthOutside = () => useAppStoreUserAuthInside(store)

export function useAppStoreUserAuth() {
  if (getCurrentInstance())
    return useAppStoreUserAuthInside()
  return useAppStoreUserAuthOutside()
}
