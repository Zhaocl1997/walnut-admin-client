import { createApp } from 'vue'

import 'virtual:windi.css'
import './assets/styles/main.scss'

import { App, setupApp } from './App'
;(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')
})()
