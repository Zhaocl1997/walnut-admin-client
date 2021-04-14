import type { Router } from 'vue-router'
import { easyIsEmpty } from 'easy-fns-ts'

import { authPath, rootName } from '../constant'
import { AppRouter } from '/@/router'
import { AppStore } from '/@/store'

const whiteLists: string[] = [authPath]

export const createAuthGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { getters, dispatch } = AppStore
    const { addRoute } = AppRouter

    // Paths in `whiteLists` will enter directly
    if (whiteLists.includes(to.path)) {
      next()
      return true
    }

    const token = getters.token

    // No token, next to auth page and return
    if (!token) {
      const redirectData = {
        path: authPath,
        replace: true,
      }

      next(redirectData)
      return true
    }

    // Get user info
    if (easyIsEmpty(getters.userInfo)) {
      await dispatch('user/commitUserInfo')
    }

    // Got menus, next and return
    if (getters.menus && getters.menus.length !== 0) {
      next()
      return true
    }

    // At this step, it menus user has login but didn't got dynamic routes generated
    // Below we dispath store method and add dynamics to router
    const routes = await dispatch('menu/commitPermissions')
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
