import type { Options } from 'sortablejs'

import Sortable from 'sortablejs'

export const useSortable = (
  options?: Options,
  sortable: MaybeRefSelf<boolean> = true
) => {
  const inst = shallowRef<Nullable<Sortable>>(null)
  const el = ref<Nullable<HTMLElement>>(null)

  watch(
    () => el,
    (v) => {
      if (unref(v)) {
        inst.value = Sortable.create(v.value!, {
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

  watch(
    () => sortable,
    (v) => {
      if (!unref(v) && inst.value) {
        inst.value.destroy()
        console.log('Sortable instance destroyed')
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )

  tryOnUnmounted(() => {
    inst.value?.destroy()
  })

  return { inst, el }
}
