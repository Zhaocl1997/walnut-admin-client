import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useUserProfileStoreInside = defineStore(StoreKeys.USER_PROFILE, {
  state: (): UserState => ({
    profile: {},
  }),

  getters: {},

  actions: {
    setProfile(payload: Partial<AppSystemUser>) {
      this.profile = payload
    },
  },
})

const useUserProfileStoreOutside = () => useUserProfileStoreInside(store)

export const useUserProfileStore = () => {
  if (getCurrentInstance()) return useUserProfileStoreInside()
  return useUserProfileStoreOutside()
}
