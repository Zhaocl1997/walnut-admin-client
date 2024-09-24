import 'virtual:uno.css'
import 'animate.css'
import './assets/styles/main.scss'
import { App, setupApp } from './App'
import { reportWebVitals } from '@/hooks/web/useWebVitals'

(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')

  reportWebVitals()
})()
