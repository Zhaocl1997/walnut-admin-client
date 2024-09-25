export function useRouterQuery(path: string) {
  const router = useAppRouter()
  const route = useAppRoute()

  const routeQuery = computed({
    get() {
      return route.query[path] ?? undefined
    },
    set(val) {
      router.replace({ query: { [path]: val } })
    },
  })

  return routeQuery
}
