import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppMsgStoreInside = defineStore(StoreKeys.APP_MSG, {
  state: (): AppMsgState => ({
    notiPlacement: 'top-right',
    msgPlacement: 'top',
  }),

  getters: {},

  actions: {
    setNotiPlacement(payload: NotificationPlacement) {
      this.notiPlacement = payload
    },

    setMsgPlacement(payload: MessagePlacement) {
      this.msgPlacement = payload
    },
  },
})

const useAppMsgStoreOutside = () => useAppMsgStoreInside(store)

export const useAppMsgStore = () => {
  if (getCurrentInstance()) return useAppMsgStoreInside()
  return useAppMsgStoreOutside()
}
