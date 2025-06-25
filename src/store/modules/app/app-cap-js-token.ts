import { authCapApiEndpoint } from '@/api/app/capjs'
import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreCapJSTokenInside = defineStore(StoreKeys.APP_CAPJS_TOKEN, {
  state: (): IAppCapJSTokenLocale => ({
    capJSInst: null,
    capComponent: null,
    capShow: false,
    onCapSuccess: null,
  }),

  getters: {},

  actions: {
    loadCap(): Promise<ICapInst> {
      if (this.capJSInst)
        return new Promise(resolve => resolve(this.capJSInst!))

      const { httpUrl } = useAppEnvProxy()

      return new Promise((resolve) => {
        useScriptTag(`${httpUrl}/static/js/cap/widget@0.1.21.js`, () => {
          this.capJSInst = window.Cap
          resolve(this.capJSInst)
        })
      })
    },

    async refreshCapJSToken() {
      const CapInst = await this.loadCap()

      const cap = new CapInst({
        apiEndpoint: authCapApiEndpoint,
      }, document.getElementById('walnut-admin-cap')!)
      const { token } = await cap.solve()

      return token
    },

    async onOpenCapModal(onSuccess: (token: string) => void) {
      this.onCapSuccess = onSuccess
      if (!this.capComponent) {
        await this.loadCap()
        const { default: CapComponent } = await import('@/components/Business/Cap')
        this.capComponent = markRaw(CapComponent) as unknown as string
      }
      this.capShow = true
    },

    onCloseCapModal() {
      this.capShow = false
      this.onCapSuccess = null
    },
  },
})

const useAppStoreCapJSTokenOutside = () => useAppStoreCapJSTokenInside(store)

export function useAppStoreCapJSToken() {
  if (getCurrentInstance())
    return useAppStoreCapJSTokenInside()
  return useAppStoreCapJSTokenOutside()
}
