export const createProgressGuard = (router: Router) => {
  router.beforeEach(() => {
    window.$loadingBar.start()
    return true
  })

  router.afterEach(() => {
    window.$loadingBar.finish()
    return true
  })
}
