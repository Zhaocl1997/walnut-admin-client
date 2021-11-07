import type { Options } from 'sortablejs'

import Sortable from 'sortablejs'

export const useSortable = (el: MaybeRef<HTMLElement>, options?: Options) => {
  return Sortable.create(unref(el), {
    animation: 500,
    delay: 400,
    delayOnTouchOnly: true,
    ...options,
  })
}
