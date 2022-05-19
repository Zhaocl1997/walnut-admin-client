import { easyIsEmpty } from 'easy-fns-ts'

import { AppAuthPath, RouteWhiteLists } from '../constant'
import { AppCoreFn1 } from '/@/core'

export const createAuthGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userAuth = useUserAuthStore()
    const userProfile = useUserProfileStore()
    const appMenu = useAppMenuStore()
    const appKey = useAppKeyStore()

    // Paths in `RouteWhiteLists` will enter directly
    if (RouteWhiteLists.includes(to.path)) {
      // Login and push to auth page, will go index menu
      if (to.path === AppAuthPath && userAuth.access_token) {
        next({ name: appMenu.indexMenuName })
        return
      }
      next()
      return
    }

    // No token, next to auth page and return
    if (!userAuth.access_token) {
      const redirectData = {
        path: AppAuthPath,
        replace: true,
      }

      next(redirectData)
      return
    }

    // Get user info
    if (easyIsEmpty(userProfile.profile)) {
      await userProfile.getProfile()
    }

    if (easyIsEmpty(appKey.baiduAK)) {
      await appKey.getSecretKeys()
    }

    // Got menus, next and return
    if (appMenu.menus && appMenu.menus.length !== 0) {
      next()
      return
    }

    // At this step, user has login but didn't got dynamic routes generated
    // Below we call app core fn1 to handle logic
    await AppCoreFn1()

    // Refresh the page, router will not be found, need to redirect
    // const AppRedirectPath: string = from.query.redirect || to.path
    // const redirect = decodeURIComponent(AppRedirectPath)
    // const nextData =
    //   to.path === redirect ? { ...to, replace: true } : { path: redirect }
    // next(nextData)

    next({ ...to, replace: true })
  })
}
