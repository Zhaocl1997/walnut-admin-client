import { defineStore } from 'pinia'
import { upperFirst } from 'easy-fns-ts'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getUserInfo } from '@/api/auth'

const useAppStoreUserProfileInside = defineStore(StoreKeys.USER_PROFILE, {
  state: (): UserProfileState => ({
    profile: {},
    info: {},
  }),

  getters: {
    getDisplayName(): string {
      return upperFirst(
        (this.profile?.nickName! ?? this.profile?.userName!) || '',
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

    setInfo(payload: Partial<UserProfileStateInfo>) {
      this.info = payload
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
  if (getCurrentInstance())
    return useAppStoreUserProfileInside()
  return useAppStoreUserProfileOutside()
}
