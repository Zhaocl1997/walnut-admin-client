import type { NotificationReactive } from 'naive-ui'
import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreNaiveInside = defineStore(StoreKeys.APP_MSG, {
  state: (): AppMsgState => ({
    notiMax: 5,
    msgMax: 5,
    notiPlacement: 'top-right',
    msgPlacement: 'top',
    notiContainerStyle: {},
    currentNotiInst: null,
    currentMsgInst: null,
  }),

  getters: {},

  actions: {
    /**
     * notificaiton
     */
    setNotiPlacement(payload: NotificationPlacement) {
      this.notiPlacement = payload
    },

    setNotiContainerStyle(payload: CSSProperties) {
      this.notiContainerStyle = payload
    },

    setCurrentNotiInst(payload: NotificationReactive) {
      this.currentNotiInst = payload
    },

    destroyCurrentNotiInst() {
      this.currentNotiInst?.destroy()
      this.currentNotiInst = null
    },

    destroyAllNotiInst() {
      useAppNotification().destroyAll()
    },

    /**
     * message
     */
    setMsgPlacement(payload: MessagePlacement) {
      this.msgPlacement = payload
    },
  },
})

const useAppStoreNaiveOutside = () => useAppStoreNaiveInside(store)

export function useAppStoreNaive() {
  if (getCurrentInstance())
    return useAppStoreNaiveInside()
  return useAppStoreNaiveOutside()
}
