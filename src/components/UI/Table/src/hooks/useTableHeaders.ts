import type { ComputedRef } from 'vue'
import { ref, unref, watch } from 'vue'
import { formatTree } from 'easy-fns-ts'
import { WTableProps, WTableHeaderItem } from '../types'

export const useTableHeaders = (props: ComputedRef<WTableProps>) => {
  const tableHeaders = ref<WTableHeaderItem[]>([])

  watch(
    () => unref(props).headers,
    (val: any) => {
      const formatted = formatTree(val, {
        format: (node) => ({ ...node, visible: node.visible !== false }),
      })

      tableHeaders.value = formatted
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
