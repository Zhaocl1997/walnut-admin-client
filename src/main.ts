import 'uno.css'
import '@unocss/reset/normalize.css'
import 'animate.css'

import './assets/styles/main.scss'

import { App, setupApp } from './App'
;(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')
})()
