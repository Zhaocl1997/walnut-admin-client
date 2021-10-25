import { easyIsEmpty } from 'easy-fns-ts'

import { authPath, networkErrorPath } from '../constant'
import { AppCoreFn1 } from '/@/core'
import { userActionInfo } from '/@/store/actions/user'

const whiteLists: string[] = [authPath, networkErrorPath]

export const createAuthGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { token, menu, user } = useAppState()

    // Paths in `whiteLists` will enter directly
    if (whiteLists.includes(to.path)) {
      next()
      return true
    }

    // No token, next to auth page and return
    if (!token.value) {
      const redirectData = {
        path: authPath,
        replace: true,
      }

      next(redirectData)
      return true
    }

    // Get user info
    if (easyIsEmpty(user.value.userInfo)) {
      await userActionInfo()
    }

    // Got menus, next and return
    if (menu.value.menus && menu.value.menus.length !== 0) {
      next()
      return true
    }

    // At this step, user has login but didn't got dynamic routes generated
    // Below we call app core fn1 to handle logic
    await AppCoreFn1()

    // Refresh the page, router will not be found, need to redirect
    // const redirectPath: string = from.query.redirect || (to.path as any)
    // const redirect = decodeURIComponent(redirectPath)
    // const nextData =
    //   to.path === redirect ? { ...to, replace: true } : { path: redirect }
    // next(nextData)

    next({ ...to, replace: true })
  })
}
