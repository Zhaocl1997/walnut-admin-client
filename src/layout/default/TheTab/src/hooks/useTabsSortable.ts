import { useSortable } from '/@/hooks/component/useSortable'
import { tabActionSort } from '/@/store/actions/tabs'

export const useTabsSortable = () => {
  onMounted(() => {
    const el = document.getElementById('tabSortable')!

    useSortable(el, {
      filter: (e) => (e.target! as any).dataset.affix === 'true',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt

        tabActionSort(oldIndex!, newIndex!)
      },
    })
  })
}
