import { ENHANCED_PREFIX, isEnhancing } from './beforeEach'

export function createBeforeResolveGuard(router: Router) {
  router.beforeResolve((to) => {
    const appSetting = useAppStoreSetting()

    if (to.name !== AppRedirectName && appSetting.app.routeQueryMode === AppConstRouteQueryMode.ENHANCED) {
      // 检查是否有已加密的参数
      const hasEncryptedParams = Object.keys(to.params).some((key) => {
        const value = to.params[key]
        return value && typeof value === 'string' && value.startsWith(ENHANCED_PREFIX)
      })

      if (!hasEncryptedParams)
        return

      if (appSetting.app.routeQueryEnhancedMode === AppConstRouteQueryEnhancedMode.BASE64) {
        const resolvedParams = { ...to.params }

        Object.keys(resolvedParams).forEach((key) => {
          const value = resolvedParams[key]
          if (value && typeof value === 'string' && value.startsWith(ENHANCED_PREFIX)) {
            // 移除前缀并解密
            resolvedParams[key] = watob(value.replace(ENHANCED_PREFIX, ''))
          }
        })
        to.meta._resolvedParams = resolvedParams
      }
    }
  })
}
