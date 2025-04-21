import { reportWebVitals } from '@/hooks/web/useWebVitals'
import { App, setupApp } from './App'
import 'virtual:uno.css'
import 'animate.css'
import './assets/styles/main.scss'

(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')

  reportWebVitals()
})()
