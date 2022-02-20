export const useRouterQuery = () => {
  const { currentRoute } = useRouter()

  return {
    query: currentRoute.value.query,
    hasQuery: Object.keys(currentRoute.value.query).length !== 0,
  }
}
