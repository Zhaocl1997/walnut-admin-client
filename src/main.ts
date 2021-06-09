import { createApp } from 'vue'

import 'virtual:windi.css'
// import 'virtual:windi-devtools'
import './assets/styles/main.scss'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

import { App, setupApp } from './App'
;(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')
})()
