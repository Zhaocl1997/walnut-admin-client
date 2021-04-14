import type { Router } from 'vue-router'

import { start, done, configure } from 'nprogress'

configure({ showSpinner: false })

export const createProgressGuard = (router: Router) => {
  router.beforeEach(() => {
    start()
    return true
  })

  router.afterEach(() => {
    done()
    return true
  })
}
