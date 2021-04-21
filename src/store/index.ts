import type { App } from 'vue'

import { createStore, useStore } from 'vuex'
import { isDev } from '/@/utils/constant/vue'

import { tabModule } from './modules/tab'

import { getters } from './getters'
import { storeKey } from './InjectionKey'

export const AppStore = createStore({
  strict: isDev(),

  getters: getters,

  modules: {
    tab: tabModule,
  },
})

export const setupStore = (app: App) => {
  app.use(AppStore, storeKey)
}

export const useAppStore = () => {
  return useStore(storeKey)
}
