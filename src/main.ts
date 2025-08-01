import { reportWebVitals } from '@/hooks/web/useWebVitals'
// import { registerSW } from 'virtual:pwa-register'

import { App, setupApp } from './App'

// unocss
import 'virtual:uno.css'

// LINK https://utc.yuy1n.io/features/highlight.html#options-1
// import '~console/theme-detect'

// LINK https://github.com/unocss/unocss/issues/2127
import '@unocss/reset/tailwind-compat.css'

// animate
import 'animate.css'

// custom scss
import './assets/styles/main.scss'

;

(async () => {
  const app = createApp(App)

  setupStorageMigrations()

  await setupApp(app)

  app.mount('#app')

  reportWebVitals()

  // registerSW({ immediate: true })
})()
