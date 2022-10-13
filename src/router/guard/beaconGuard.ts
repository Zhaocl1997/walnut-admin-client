export const createBeaconGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    sendBeacon({
      focus: true,
      left: false,
      currentRouter: to.fullPath,
    })
    next()
  })
}
