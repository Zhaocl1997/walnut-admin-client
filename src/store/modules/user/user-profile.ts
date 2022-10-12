import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getUserInfo } from '@/api/auth'
import { upperFirst } from 'easy-fns-ts'

const useAppStoreUserProfileInside = defineStore(StoreKeys.USER_PROFILE, {
  state: (): UserProfileState => ({
    profile: {},
    ip: '',
    cityName: '',
  }),

  getters: {
    getDisplayName(): string {
      return upperFirst(
        (this.profile?.nickName! ?? this.profile?.userName!) || ''
      )
    },

    getNameFirstLetter(): string {
      return this.getDisplayName.charAt(0)
    },

    getAvatar(): string {
      return this.profile.avatar!
    },
  },

  actions: {
    setProfile(payload: Partial<AppSystemUser>) {
      this.profile = payload
    },

    setIP(payload: string) {
      this.ip = payload
    },

    setCityName(payload: string) {
      this.cityName = payload
    },

    async getProfile() {
      const res = await getUserInfo()
      this.setProfile(res?.user)
    },

    clearProfile() {
      this.setProfile({})
    },
  },
})

const useAppStoreUserProfileOutside = () => useAppStoreUserProfileInside(store)

export const useAppStoreUserProfile = () => {
  if (getCurrentInstance()) return useAppStoreUserProfileInside()
  return useAppStoreUserProfileOutside()
}
