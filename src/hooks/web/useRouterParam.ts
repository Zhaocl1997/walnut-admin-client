export function useRouterParam(path: string) {
  const router = useAppRouter()
  const route = useAppRoute()

  const routeParam = computed({
    get() {
      return route.params[path] as string ?? undefined
    },
    set(val) {
      router.replace({ params: { [path]: val } })
    },
  })

  return routeParam
}
