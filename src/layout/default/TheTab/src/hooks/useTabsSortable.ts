import type Sortable from 'sortablejs'
import { useSortable } from '/@/hooks/component/useSortable'
import { changeTabOrder } from '/@/core/tab'

let inst: Sortable

export const useTabsSortable = (isSortable: boolean) => {
  if (!isSortable) {
    inst?.destroy()
    return
  }

  const el = document.getElementById('tabSortable')!

  const instance = useSortable(el, {
    draggable: '.tab-draggable',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt

      changeTabOrder(oldIndex!, newIndex!)
    },
  })

  inst = instance
}
