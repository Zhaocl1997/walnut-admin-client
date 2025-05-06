import { reportWebVitals } from '@/hooks/web/useWebVitals'
import { App, setupApp } from './App'

// unocss
import 'virtual:uno.css'

// reset css
// TODO influence naive ui style
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'

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
