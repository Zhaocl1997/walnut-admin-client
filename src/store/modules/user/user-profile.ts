import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'
import { getUserInfo } from '/@/api/auth'
import { upperFirst } from 'easy-fns-ts'

const useUserProfileStoreInside = defineStore(StoreKeys.USER_PROFILE, {
  state: (): UserState => ({
    profile: {},
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

    async getProfile() {
      const res = await getUserInfo()
      this.setProfile(res)
    },

    clearProfile() {
      this.setProfile({})
    },
  },
})

const useUserProfileStoreOutside = () => useUserProfileStoreInside(store)

export const useUserProfileStore = () => {
  if (getCurrentInstance()) return useUserProfileStoreInside()
  return useUserProfileStoreOutside()
}
