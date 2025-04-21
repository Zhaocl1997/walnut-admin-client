import { AppCoreFn1 } from '@/core'

import { _confirm_leave_map_ } from '@/store/modules/app/app-tab'
import { isEmpty, isUndefined } from 'lodash-es'

let removeEvent: Fn

const appLock = useAppStoreLock()

export function createBeforeEachGuard(router: Router) {
  // TODO beforeResolve
  // TODO initial trigger twice
  // logic optimise, with next()
  router.beforeEach(async (to, from) => {
    // start loadingbar
    window.$loadingBar.start()

    if (to.fullPath)
      AppConsoleLog('Route Guard', `Entering Route : ${to.fullPath}`)

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

    // enter the `leaveTip` page, hang on the unload event
    if (to.meta.leaveTip) {
      // set the confirm map
      _confirm_leave_map_.set(to.name, false)

      // if the old event listener not removed, remove it
      if (removeEvent)
        removeEvent()

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
      from.meta.leaveTip
      && to.name !== from.name
      && (_confirm_leave_map_.get(from.name) === undefined
        || _confirm_leave_map_.get(from.name) === false)
    ) {
      const confirmed = await useAppConfirm(AppI18n.global.t('app.base.leaveTip'), {
        closable: false,
        closeOnEsc: false,
        maskClosable: false,
      })

      if (!confirmed)
        return { ...from, replace: true }

      _confirm_leave_map_.set(from.name, true)
      removeEvent()
    }

    // handle lock logic
    if (
      AppRouter.hasRoute(AppLockName)
      && appLock.isLock
      && appLock.lockRoute
    ) {
      if (to.name !== AppLockName)
        return { name: AppLockName }
    }

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
