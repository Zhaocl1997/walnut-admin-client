import { setupI18n } from '@/locales'

import { setupRouter } from '@/router'
import { setupSocket } from '@/socket'
import { setupStore } from '@/store/pinia'
import StarportPlugin from 'vue-starport'

function setupErrorhandler(app: App) {
  app.config.errorHandler = (error) => {
    AppConsoleErr('AppErrorHandler', error)
  }

  app.config.warnHandler = (warn) => {
    AppConsoleWarn('AppWarnHandler', warn)
  }
}

/**
 * @description Entry to set up Vue App
 */
export async function setupApp(app: App) {
  await useExternalGeoIP()

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

  AppConsoleInfo('setupApp', 'App Initializing...')
}
