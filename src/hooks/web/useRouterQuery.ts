export function useRouterQuery(path: string) {
  const router = useAppRouter()
  const route = useAppRoute()

  const routeQuery = computed({
    get() {
      return route.query[path] as string ?? undefined
    },
    set(val) {
      router.replace({ query: { [path]: val } })
    },
  })

  return routeQuery
}
