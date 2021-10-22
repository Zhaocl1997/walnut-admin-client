import type { Options } from 'sortablejs'
import type { MaybeRef } from '@vueuse/core'

export const useSortable = (el: MaybeRef<HTMLElement>, options?: Options) => {
  nextTick(async () => {
    const Sortable = (await import('sortablejs')).default

    Sortable.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    })
  })
}
