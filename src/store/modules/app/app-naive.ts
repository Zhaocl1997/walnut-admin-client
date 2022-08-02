import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreNaiveInside = defineStore(StoreKeys.APP_MSG, {
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

const useAppStoreNaiveOutside = () => useAppStoreNaiveInside(store)

export const useAppStoreNaive = () => {
  if (getCurrentInstance()) return useAppStoreNaiveInside()
  return useAppStoreNaiveOutside()
}
