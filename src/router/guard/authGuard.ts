import { easyIsEmpty } from 'easy-fns-ts'

import { authPath, rootName, networkErrorPath } from '../constant'
import { menuActionPermissions } from '/@/store/actions/menu'
import { userActionInfo } from '/@/store/actions/user'

const whiteLists: string[] = [authPath, networkErrorPath]

export const createAuthGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { user, menu } = useAppContext<false>()
    const { addRoute } = AppRouter

    // Paths in `whiteLists` will enter directly
    if (whiteLists.includes(to.path)) {
      next()
      return true
    }

    // No token, next to auth page and return
    if (!user.token) {
      const redirectData = {
        path: authPath,
        replace: true,
      }

      next(redirectData)
      return true
    }

    // Get user info
    if (easyIsEmpty(user.userInfo)) {
      await userActionInfo()
    }

    // Got menus, next and return
    if (menu.menus && menu.menus.length !== 0) {
      next()
      return true
    }

    // At this step, user has login but didn't got dynamic routes generated
    // Below we use menu action to get routes and add into root route
    const routes = await menuActionPermissions()
    routes.forEach((route: any) => {
      addRoute(rootName, route)
    })

    // Refresh the page, router will not be found, need to redirect
    const redirectPath: string = from.query.redirect || (to.path as any)
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }

    next(nextData)
  })
}
