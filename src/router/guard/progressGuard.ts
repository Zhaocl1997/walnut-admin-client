export const createProgressGuard = (router: Router) => {
  router.beforeEach((from) => {
    if (from.fullPath) {
      AppLog(`Entering Route : ${from.fullPath}`)
    }
    window.$loadingBar.start()
    return true
  })

  router.afterEach(() => {
    window.$loadingBar.finish()
    return true
  })
}
