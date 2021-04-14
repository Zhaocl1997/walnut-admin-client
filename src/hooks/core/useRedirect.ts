import { AppRouter } from '/@/router'
import { redirectPath } from '/@/router/constant'

/**
 * @description use redirect
 */
export const useRedirect = () => {
  const { push, currentRoute } = AppRouter

  const { query, params } = currentRoute.value

  const redirect = (): Promise<boolean> => {
    return new Promise((resolve) => {
      push({
        path: redirectPath + currentRoute.value.fullPath,
        query,
        params,
      }).then(() => resolve(true))
    })
  }

  return { redirect }
}
