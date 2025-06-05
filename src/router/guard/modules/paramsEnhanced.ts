const isRouteParamsEnhancing = ref(false)
const ENHANCED_ROUTE_PARAMS_PREFIX = 'ep_'

export function createRouteParamsEnhancedGuard(router: Router) {
  const appSetting = useAppStoreSetting()

  // beforeEach
  router.beforeEach((to, _from) => {
    if (!router.currentRoute.value.name)
      return true

    if (to.name !== AppRedirectName && !isRouteParamsEnhancing.value && appSetting.app.routeQueryMode === AppConstRouteQueryMode.ENHANCED) {
      const hasUnenhancedParams = Object.keys(to.params).some((key) => {
        const value = to.params[key]
        return value && typeof value === 'string' && !value.startsWith(ENHANCED_ROUTE_PARAMS_PREFIX)
      })

      if (!hasUnenhancedParams)
        return true

      if (appSetting.app.routeQueryEnhancedMode === AppConstRouteQueryEnhancedMode.BASE64) {
        isRouteParamsEnhancing.value = true
        const encryptedParams = { ...to.params }
        Object.keys(encryptedParams).forEach((key) => {
          const value = encryptedParams[key]
          if (value && typeof value === 'string' && !value.startsWith(ENHANCED_ROUTE_PARAMS_PREFIX)) {
            encryptedParams[key] = ENHANCED_ROUTE_PARAMS_PREFIX + wbtoa(value)
          }
        })
        return { ...to, params: encryptedParams, replace: true }
      }
    }
  })

  // beforeResolve
  router.beforeResolve((to) => {
    if (to.name !== AppRedirectName && appSetting.app.routeQueryMode === AppConstRouteQueryMode.ENHANCED) {
      const hasEncryptedParams = Object.keys(to.params).some((key) => {
        const value = to.params[key]
        return value && typeof value === 'string' && value.startsWith(ENHANCED_ROUTE_PARAMS_PREFIX)
      })

      if (!hasEncryptedParams)
        return

      if (appSetting.app.routeQueryEnhancedMode === AppConstRouteQueryEnhancedMode.BASE64) {
        const resolvedParams = { ...to.params }

        Object.keys(resolvedParams).forEach((key) => {
          const value = resolvedParams[key]
          if (value && typeof value === 'string' && value.startsWith(ENHANCED_ROUTE_PARAMS_PREFIX)) {
            resolvedParams[key] = watob(value.replace(ENHANCED_ROUTE_PARAMS_PREFIX, ''))
          }
        })
        to.meta._resolvedParams = resolvedParams
      }
    }
  })

  // afterEach
  router.afterEach(() => {
    isRouteParamsEnhancing.value = false
  })
}
