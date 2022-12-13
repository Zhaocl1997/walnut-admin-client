import { isUndefined, isEmpty } from 'lodash-es'

import { AppCoreFn1 } from '@/core'
import { _confirm_leave_map_ } from '@/store/modules/app/app-tab'

let removeEvent: Fn

const appKey = useAppStoreSecretKey()
const appLock = useAppStoreLock()

export const createAuthGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userAuth = useAppStoreUserAuth()
    const userProfile = useAppStoreUserProfile()
    const appMenu = useAppStoreMenu()

    // enter the `leaveTip` page, hang on the unload event
    if (to.meta.leaveTip) {
      // set the confirm map
      _confirm_leave_map_.set(to.name, false)

      // if the old event listener not removed, remove it
      if (removeEvent) removeEvent()

      removeEvent = useEventListener('beforeunload', (e) => {
        e.preventDefault()
        e.returnValue = '关闭提示'
        return '关闭提示'
      })
    }

    // when leaving from the `leaveTip` page
    // ask user for confirm
    // also remember to remove the unload event to make sure this only work on the `leaveTip` page
    if (
      from.meta.leaveTip &&
      to.name !== from.name &&
      (_confirm_leave_map_.get(from.name) === undefined ||
        _confirm_leave_map_.get(from.name) === false)
    ) {
      const res = await useAppConfirm(AppI18n.global.t('app.base.leaveTip'), {
        closable: false,
        closeOnEsc: false,
        maskClosable: false,
      })

      if (!res) {
        next({ ...from, replace: true })
        return
      }

      _confirm_leave_map_.set(from.name, true)

      removeEvent()

      next()

      return
    }

    // Paths in `routeWhiteListPath` will enter directly
    if (routeWhiteListPath.includes(to.path)) {
      // Login and push to auth page, will go index menu
      if (to.path === AppAuthPath && userAuth.accessToken) {
        next({ name: appMenu.indexMenuName })
        return
      }
      next()
      return
    }

    // since almost all the routes are fetch from backend
    // default _auth would be undefined
    // this flag below should only works for hard-coded routes in frontend codes
    // no need to excute the logic below, like profile or permisison
    if (!isUndefined(to.meta?._auth) && !to.meta._auth) {
      next()
      return
    }

    // No token, next to auth page and return
    if (!userAuth.accessToken) {
      next({
        path: AppAuthPath,
        replace: true,
      })
      return
    }

    // handle lock logic
    if (
      AppRouter.hasRoute(AppLockName) &&
      appLock.isLock &&
      appLock.lockRoute
    ) {
      if (to.name !== AppLockName) {
        next({
          name: AppLockName,
        })
        return
      }
    }

    // Get user info
    if (isEmpty(userProfile.profile)) {
      await userProfile.getProfile()
    }

    if (isEmpty(appKey.baiduAK)) {
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

    next(to)
  })
}
