export const createProgressGuard = (router: Router) => {
  router.beforeEach((to) => {
    if (to.fullPath) {
      AppLog(`Entering Route : ${to.fullPath}`)
    }
    window.$loadingBar.start()
    return true
  })

  router.afterEach(() => {
    window.$loadingBar.finish()
    return true
  })
}
