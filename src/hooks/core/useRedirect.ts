/**
 * @description use redirect
 */
export const useRedirect = (): Promise<boolean> => {
  const { push, currentRoute } = AppRouter

  const { query, params } = currentRoute.value

  const path = AppRedirectPath + currentRoute.value.fullPath

  return new Promise(resolve =>
    push({
      path,
      query,
      params,
      replace: true,
    }).then(() => resolve(true)),
  )
}
