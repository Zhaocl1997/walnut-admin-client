import type { Options } from 'sortablejs'
import type { EffectScope } from 'vue'

import Sortable from 'sortablejs'

export const useSortable = (
  sortable: MaybeRefSelf<boolean>,
  options?: Options
) => {
  let scope: EffectScope

  const inst = shallowRef<Nullable<Sortable>>(null)
  const el = ref<Nullable<HTMLElement>>(null)

  watch(
    () => sortable,
    (v) => {
      if (unref(v)) {
        scope = effectScope()

        scope.run(() => {
          watch(
            () => el.value,
            (element) => {
              if (element) {
                inst.value = Sortable.create(element!, {
                  animation: 500,
                  delay: 400,
                  delayOnTouchOnly: true,
                  ...options,
                })
              }
            },
            {
              deep: true,
              immediate: true,
            }
          )

          tryOnScopeDispose(() => {
            inst.value?.destroy()
          })
        })
      } else {
        scope?.stop()
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return { inst, el }
}
