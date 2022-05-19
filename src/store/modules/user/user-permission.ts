import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useUserPermissionStoreInside = defineStore(StoreKeys.USER_PERMISSION, {
  state: (): UserPermissionState => ({
    permissions: [],
  }),

  getters: {},

  actions: {
    setPermissions(payload: string[]) {
      this.permissions = payload
    },

    createPermissions(payload: AppSystemMenu[]): string[] {
      return payload.map((i) => i.permission!).filter((i) => i)
    },

    clearPermissions() {
      this.setPermissions([])
    },
  },
})

const useUserPermissionStoreOutside = () => useUserPermissionStoreInside(store)

export const useUserPermissionStore = () => {
  if (getCurrentInstance()) return useUserPermissionStoreInside()
  return useUserPermissionStoreOutside()
}
