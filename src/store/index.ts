import type { App } from 'vue'

import { createStore } from 'vuex'
import { isDev } from '/@/utils/constant/vue'

export const AppStore = createStore({
  strict: isDev(),
})

export const setupStore = (app: App) => {
  app.use(AppStore)
}
