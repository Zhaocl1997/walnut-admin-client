import type { Router } from 'vue-router'

export function createLockGuard(router: Router) {
  const appLock = useAppStoreLock()
  const appMenu = useAppStoreMenu()

  // beforeEach
  router.beforeEach((to) => {
    if (AppRouter.hasRoute(AppLockName) && appLock.isLock && appLock.lockRoute) {
      if (to.name !== AppLockName)
        return { name: AppLockName }
    }

    if (AppRouter.hasRoute(AppLockName) && !appLock.isLock && to.name === AppLockName) {
      return { name: appMenu.indexMenuName }
    }
  })
}
