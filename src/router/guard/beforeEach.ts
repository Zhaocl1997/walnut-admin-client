import { AppCoreFn1 } from '@/core'

import { isEmpty, isUndefined } from 'lodash-es'

export function createBeforeEachGuard(router: Router) {
  // TODO beforeResolve
  // TODO initial trigger twice
  // logic optimise, with next()
  router.beforeEach(async (to, _from) => {
    const userAuth = useAppStoreUserAuth()
    const userProfile = useAppStoreUserProfile()
    const appMenu = useAppStoreMenu()

    // Paths in `routeWhiteListPath` will enter directly
    if (routeWhiteListPath.includes(to.path)) {
      // Login and push to auth page, will go index menu
      if (userAuth.accessToken && to.path === AppAuthPath)
        return { name: appMenu.indexMenuName }
    }

    // since almost all the routes are fetch from backend
    // default _auth would be undefined
    // this flag below should only works for hard-coded routes in frontend codes
    // no need to excute the logic below, like profile or permisison
    if (!isUndefined(to.meta?._auth) && !to.meta._auth)
      return true

    // No token, next to auth page and return
    if (!userAuth.accessToken)
      return { path: AppAuthPath, replace: true }

    // no menus, means no permission or profile etc
    if (appMenu.menus.length === 0) {
      // Get user info
      if (isEmpty(userProfile.profile))
        await userProfile.getProfile()

      // At this step, user has login but didn't got dynamic routes generated
      // Below we call app core fn1 to handle logic
      await AppCoreFn1()

      // LINK https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes-inside-navigation-guards
      return to.fullPath
    }
  })
}
