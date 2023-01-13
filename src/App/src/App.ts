import StarportPlugin from 'vue-starport'

import { setupSocket } from '@/socket'
import { setupI18n } from '@/locales'
import { setupRouter } from '@/router'
import { setupStore } from '@/store/pinia'

const setupErrorhandler = (app: App) => {
  app.config.errorHandler = (error) => {
    AppError(error)
  }

  app.config.warnHandler = (warn) => {
    AppWarn(warn)
  }
}

/**
 * @description Entry to set up Vue App
 */
export const setupApp = async (app: App) => {
  await useFingerprint()

  setupSocket()

  await setupI18n(app)

  setupRouter(app)

  setupStore(app)

  setupErrorhandler(app)

  app.use(StarportPlugin())

  useCleanLocalStroage()

  if (isDev())
    app.config.performance = true

  AppInfo('App Initializing...')
}
