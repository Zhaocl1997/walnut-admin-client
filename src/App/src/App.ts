import StarportPlugin from 'vue-starport'

import { setupSocket } from '@/socket'
import { setupI18n } from '@/locales'
import { setupRouter } from '@/router'
import { setupStore } from '@/store/pinia'

function setupErrorhandler(app: App) {
  app.config.errorHandler = (error) => {
    new AppError(error)
  }

  app.config.warnHandler = (warn) => {
    AppWarn(warn)
  }
}

/**
 * @description Entry to set up Vue App
 */
export async function setupApp(app: App) {
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
