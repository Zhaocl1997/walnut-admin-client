import { reportWebVitals } from '@/hooks/web/useWebVitals'
import { App, setupApp } from './App'

// unocss
import 'virtual:uno.css'

// LINK https://github.com/unocss/unocss/issues/2127
import '@unocss/reset/tailwind-compat.css'

// LINK https://utc.yuy1n.io/features/highlight.html#options-1
import '~console/theme-detect'

// animate
import 'animate.css'

// custom scss
import './assets/styles/main.scss'

(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')

  reportWebVitals()
})()
