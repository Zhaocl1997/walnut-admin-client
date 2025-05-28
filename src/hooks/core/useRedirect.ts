/**
 * @description use redirect
 */
export function useRedirect(): Promise<boolean> {
  const { push, currentRoute } = AppRouter

  const { query } = currentRoute.value

  const path = AppRedirectPath + currentRoute.value.fullPath

  return new Promise(resolve =>
    push({
      path,
      query,
      replace: true,
    }).then(() => resolve(true)),
  )
}
