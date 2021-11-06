import type Sortable from 'sortablejs'
import { useSortable } from '/@/hooks/component/useSortable'
import { sortTabs } from '/@/core/tab'

let inst: Sortable

export const useTabsSortable = (isSortable: boolean) => {
  if (!isSortable) {
    inst?.destroy()
    return
  }

  const el = document.getElementById('tabSortable')!

  const instance = useSortable(el, {
    filter: (e) => (e.target! as any).dataset.affix === 'true',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt

      sortTabs(oldIndex!, newIndex!)
    },
  })

  inst = instance
}
