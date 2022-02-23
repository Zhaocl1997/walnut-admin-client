import { AppRedirectPath } from '/@/router/constant'

/**
 * @description use redirect
 */
export const useRedirect = () => {
  const { push, currentRoute } = AppRouter

  const { query, params } = currentRoute.value

  const redirect = (): Promise<boolean> => {
    return new Promise((resolve) => {
      push({
        path: AppRedirectPath + currentRoute.value.fullPath,
        query,
        params,
        replace: true,
      }).then(() => resolve(true))
    })
  }

  return { redirect }
}
