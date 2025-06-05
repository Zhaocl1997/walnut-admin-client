export function useRouterParam(path: string) {
  const router = useAppRouter()
  const route = useAppRoute()
  const appSetting = useAppStoreSetting()

  const routeParam = computed({
    get() {
      if (appSetting.app.routeQueryMode === AppConstRouteQueryMode.ENHANCED) {
        if (appSetting.app.routeQueryEnhancedMode === AppConstRouteQueryEnhancedMode.BASE64) {
          return (route.meta?._resolvedParams ?? {})[path]
        }
      }
      return route.params[path] as string ?? undefined
    },
    set(val) {
      router.replace({ params: { [path]: val } })
    },
  })

  return routeParam
}
