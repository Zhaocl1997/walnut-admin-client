import { getUserInfoAPI } from '@/api/auth'
import { upperFirst } from 'easy-fns-ts'
import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserProfileInside = defineStore(StoreKeys.USER_PROFILE, {
  state: (): IUserStoreProfile => ({
    profile: {},
  }),

  getters: {
    getDisplayName(): string {
      if (this.profile.nickName)
        return upperFirst(this.profile.nickName)
      if (this.profile.userName)
        return upperFirst(this.profile.userName)
      return ''
    },

    getNameFirstLetter(): string {
      return this.getDisplayName.charAt(0)
    },

    getAvatar(): string {
      return this.profile.avatar!
    },

    getRoleList(state) {
      return state.profile.populated_rolesList
    },

    getCurrentRole(state) {
      return state.profile.currentRole
    },

    getCurrentRoleModeIsSwitchable(state) {
      return state.profile.roleMode === 'switchable'
    },
  },

  actions: {
    setProfile(payload: Partial<AppSystemUser>) {
      this.profile = payload
    },

    async getProfile() {
      const res = await getUserInfoAPI()
      this.setProfile(res?.user)
    },

    clearProfile() {
      this.setProfile({})
    },

    setAvatar(newAvatar: string) {
      this.setProfile(Object.assign(this.profile, { avatar: newAvatar }))
    },
  },
})

const useAppStoreUserProfileOutside = () => useAppStoreUserProfileInside(store)

export function useAppStoreUserProfile() {
  if (getCurrentInstance())
    return useAppStoreUserProfileInside()
  return useAppStoreUserProfileOutside()
}
