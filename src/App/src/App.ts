import type { App } from 'vue'

import { setupI18n } from '/@/locales'
import { setupElementPlus } from '/@/components'
import { AppRouter, setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { setupDirectives } from '/@/directives'

import { appError, appWarning } from '/@/utils/log'
import { isDev } from '/@/utils/constant/vue'

import '/@/components/UI/Icon/src/utils/bundle'

const setupErrorhandler = (app: App) => {
  app.config.errorHandler = (err, vm, info) => {
    appError({ err, vm, info })
  }

  app.config.warnHandler = (msg, vm, trace) => {
    appWarning('App Capture', { msg, vm, trace } as any)
  }
}

/**
 * @description Entry to set up Vue App
 */
export const setupApp = async (app: App) => {
  await setupI18n(app)

  // setupStore(app)

  setupRouter(app)

  setupElementPlus(app)

  setupDirectives(app)

  setupErrorhandler(app)

  await AppRouter.isReady()

  if (isDev()) {
    app.config.performance = true
  }
}
