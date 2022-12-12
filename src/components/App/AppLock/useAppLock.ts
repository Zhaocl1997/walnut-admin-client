import type { EffectScope } from 'vue'
import { AppLockRoute } from '@/router/routes/builtin'

export const useAppLock = () => {
  let lockScope: EffectScope

  const { currentRoute, addRoute } = useAppRouter()

  const appLock = useAppStoreLock()
  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.getLockStatus,
    (v) => {
      if (v) {
        lockScope = effectScope()
        lockScope.run(() => {
          // dynamic add lock route
          addRoute(AppLockRoute)

          let idleLockScope: EffectScope
          let securityLockScope: EffectScope

          watch(
            () => appSetting.app.lockMode,
            (lockMode) => {
              switch (lockMode) {
                // idle lock mode
                case AppConstLockMode.IDLE:
                  {
                    securityLockScope?.stop()

                    idleLockScope = effectScope()
                    idleLockScope.run(() => {
                      let idleSecondsScope: EffectScope

                      watch(
                        () => appSetting.app.lockIdleSeconds,
                        (v) => {
                          if (!v) return

                          idleSecondsScope?.stop()

                          idleSecondsScope = effectScope()

                          idleSecondsScope.run(() => {
                            const { idle: isIdle } = useIdle(
                              appSetting.app.lockIdleSeconds * 1000
                            )

                            // detect user idle state
                            watch(isIdle, async (v) => {
                              if (v && appSetting.app.lockIdleSeconds !== 0) {
                                await appLock.lock(currentRoute)
                              }
                            })
                          })
                        },
                        { immediate: true }
                      )
                    })
                  }
                  break

                // security lock mode
                case AppConstLockMode.SECURITY:
                  {
                    idleLockScope?.stop()

                    securityLockScope = effectScope()
                    securityLockScope.run(() => {
                      const { idle: isIdle } = useIdle(15 * 1000)
                      const isVisible = useSharedDocumentVisibility()
                      const isPageLeave = useSharedPageLeave()

                      // in security mode, idle for 15s the app will auto lock
                      watch(isIdle, async (v) => {
                        if (v) {
                          await appLock.lock(currentRoute)
                        }
                      })

                      // detect mouse leave page or not
                      debouncedWatch(
                        isPageLeave,
                        async (v) => {
                          if (v) {
                            await appLock.lock(currentRoute)
                          }
                        },
                        { debounce: 200 }
                      )

                      // detect window visibility
                      watch(isVisible, async (v) => {
                        if (
                          appSetting.app.lockMode ===
                            AppConstLockMode.SECURITY &&
                          !v
                        ) {
                          await appLock.lock(currentRoute)
                        }
                      })
                    })
                  }
                  break

                default:
                  {
                    idleLockScope?.stop()
                    securityLockScope?.stop()
                  }
                  break
              }
            },
            {
              immediate: true,
            }
          )
        })
      } else {
        appLock.setIsLock(false)
        appLock.setLockRoute({})
        lockScope?.stop()
      }
    },
    {
      immediate: true,
    }
  )
}
