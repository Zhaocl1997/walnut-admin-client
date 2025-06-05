export function useRouterParam(path: string) {
  const router = useAppRouter()
  const route = useAppRoute()
  const appSetting = useAppStoreSetting()

  const routeParam = computed({
    get() {
      if (appSetting.app.routeQueryMode === AppConstRouteQueryMode.ENHANCED) {
        return (route.meta?._resolvedParams ?? {})[path]
      }
      return route.params[path] as string ?? undefined
    },
    set(val) {
      router.replace({ params: { [path]: val } })
    },
  })

  return routeParam
}
