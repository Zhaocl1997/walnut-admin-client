import type { EffectScope } from 'vue'

export function useAppHijackF5() {
  let scope: EffectScope

  const appSetting = useAppStoreSetting()

  watch(
    () => appSetting.app.hijackRefresh,
    (v) => {
      if (v) {
        scope = effectScope()
        scope.run(() => {
          useEventListener('keydown', async (e) => {
            if (e.key === 'F5') {
              e.preventDefault()
              toggleLocalRefreshFlag()
            }
          })
        })
      }
      else {
        scope?.stop()
      }
    },
    {
      immediate: true,
    },
  )
}
