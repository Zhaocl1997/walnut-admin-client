import { setupI18n } from '/@/locales'
import { setupRouter } from '/@/router'

import { isDev } from '/@/utils/constant/vue'

import '/@/components/UI/Icon/src/utils/bundle'
import '/@/store'

const setupErrorhandler = (app: App) => {
  app.config.errorHandler = (error) => {
    // AppBrowserError(error)
    console.error(error)
  }

  app.config.warnHandler = (warn) => {
    AppBrowserWarn(warn)
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

  AppTerminalLog('App Initialized!')
}
