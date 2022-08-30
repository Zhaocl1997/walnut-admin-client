/**
 * @description use redirect
 */
export const useRedirect = (): Promise<boolean> => {
  const { push, currentRoute } = AppRouter

  const { query, params } = currentRoute.value

  return new Promise((resolve) =>
    push({
      path: AppRedirectPath + currentRoute.value.fullPath,
      query,
      params,
      replace: true,
    }).then(() => resolve(true))
  )
}
