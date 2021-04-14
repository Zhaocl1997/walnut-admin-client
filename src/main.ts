import { createApp } from 'vue'

import 'virtual:windi.css'
import './assets/styles/main.scss'

import App from './App.vue'
import { setupApp } from './app'
;(async () => {
  const app = createApp(App)

  await setupApp(app)

  app.mount('#app')
})()

// TODO core permission string function

// TODO env optimise
// TODO optimise elMessage second package
// TODO optimise tab still need to optimise
// TODO optimise layout aside hide in mobile screen
// TODO element plus locale change
// TODO useMouse
// TODO menu page optimise
// TODO menu table expand slow
// TODO build element-plus needed bundled not working
// TODO build automatic release and publish
// TODO feat form/table refactor
// TODO feat virtual scroll
// TODO feat value format
// TODO feat clickoutside haven't seen through
// TODO feat permission directive
