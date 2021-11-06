import { setupI18n } from '/@/locales'
import { setupRouter } from '/@/router'

import { appError, appWarning } from '/@/utils/log'
import { isDev } from '/@/utils/constant/vue'

import '/@/components/UI/Icon/src/utils/bundle'

const setupErrorhandler = (app: App) => {
  app.config.errorHandler = (err, vm, info) => {
    appError({ err, vm, info })
  }

  app.config.warnHandler = (warn) => {
    appWarning('App Capture', warn)
  }
}

/**
 * @description Entry to set up Vue App
 */
export const setupApp = async (app: App) => {
  await setupI18n(app)

  setupRouter(app)

  setupErrorhandler(app)

  if (isDev()) {
    app.config.performance = true
  }
}
