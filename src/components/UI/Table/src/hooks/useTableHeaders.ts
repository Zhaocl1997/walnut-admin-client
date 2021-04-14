import type { ComputedRef } from 'vue'
import { ref, unref, watch } from 'vue'
import { WTableProps, WTableHeaderItem } from './../types'

export const useTableHeaders = (props: ComputedRef<WTableProps>) => {
  const tableHeaders = ref<WTableHeaderItem[]>([])

  watch(
    () => unref(props).headers,
    (val: any) => {
      tableHeaders.value = val
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    tableHeaders,
  }
}
