import type { App } from 'vue'

import { createLogger, createStore, useStore } from 'vuex'
import { isDev } from '/@/utils/constant/vue'

import { userModule } from './modules/user'
import { menuModule } from './modules/menu'
import { tabModule } from './modules/tab'

import { getters } from './getters'
import { storeKey } from './InjectionKey'

export const AppStore = createStore({
  strict: isDev(),

  getters: getters,

  modules: {
    user: userModule,
    menu: menuModule,
    tab: tabModule,
  },

  // plugins: [createLogger()]
})

export const setupStore = (app: App) => {
  app.use(AppStore, storeKey)
}

export const useAppStore = () => {
  return useStore(storeKey)
}
