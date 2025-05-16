export function useRouterQuery(path: string) {
  const route = useAppRoute()
  const router = useAppRouter()

  const routeQuery = computed({
    get() {
      return route.query[path] as string ?? undefined
    },
    set(val) {
      router.replace({ query: { ...router.currentRoute.value.query, [path]: val } })
    },
  })

  return routeQuery
}
