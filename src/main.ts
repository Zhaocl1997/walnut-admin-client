import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './assets/styles/main.scss'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

// import 'uno.css'

import { App, setupApp } from './App'
;(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')
})()
