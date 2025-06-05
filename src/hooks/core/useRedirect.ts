/**
 * @description use redirect
 */
export function useRedirect(): Promise<boolean> {
  const { replace, currentRoute } = AppRouter

  const { query } = currentRoute.value

  const path = AppRedirectPath + currentRoute.value.fullPath

  return new Promise(resolve =>
    replace({
      path,
      query,
    }).then(() => resolve(true)),
  )
}
