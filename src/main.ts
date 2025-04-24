import { reportWebVitals } from '@/hooks/web/useWebVitals'
import { App, setupApp } from './App'
import 'virtual:uno.css'
// LINK https://utc.yuy1n.io/features/highlight.html#options-1
import '~console/theme-detect'
import 'animate.css'
import './assets/styles/main.scss'

(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')

  reportWebVitals()
})()
