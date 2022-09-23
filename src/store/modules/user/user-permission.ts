import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserPermissionInside = defineStore(StoreKeys.USER_PERMISSION, {
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

    deletePermission(payload?: string) {
      if (!payload) return true

      const index = this.permissions.findIndex((i) => i === payload)
      this.permissions.splice(index, 1)
    },

    togglePermission(payload?: string) {
      if (!payload) return true

      if (this.hasPermission(payload)) {
        this.deletePermission(payload)
      } else {
        this.permissions.push(payload)
      }
    },

    hasPermission(payload?: string) {
      if (!payload) return true

      return this.permissions.includes(payload)
    },
  },
})

const useAppStoreUserPermissionOutside = () =>
  useAppStoreUserPermissionInside(store)

export const useAppStoreUserPermission = () => {
  if (getCurrentInstance()) return useAppStoreUserPermissionInside()
  return useAppStoreUserPermissionOutside()
}
