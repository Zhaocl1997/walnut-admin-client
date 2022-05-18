import { defineStore } from 'pinia'
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
    setRemember(payload: { userName: string; password: string }) {
      this.remember = payload
    },
  },
})

const useUserAuthStoreOutside = () => useUserAuthStoreInside(store)

export const useUserAuthStore = () => {
  if (getCurrentInstance()) return useUserAuthStoreInside()
  return useUserAuthStoreOutside()
}
