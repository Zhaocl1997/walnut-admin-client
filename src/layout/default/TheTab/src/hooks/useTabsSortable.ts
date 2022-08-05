import type Sortable from 'sortablejs'
import { useSortable } from '@/hooks/component/useSortable'

let inst: Sortable

export const useTabsSortable = (isSortable: boolean) => {
  const appTab = useAppStoreTab()

  if (!isSortable) {
    inst?.destroy()
    return
  }

  const el = document.getElementById('tabSortable')!

  const instance = useSortable(el, {
    draggable: '.tab-draggable',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt

      appTab.changeTabOrder(oldIndex!, newIndex!)
    },
  })

  inst = instance
}
