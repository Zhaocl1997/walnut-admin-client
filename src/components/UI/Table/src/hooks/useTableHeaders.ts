import type { ComputedRef } from 'vue'
import type { WTableProps, WTableHeaderItem } from '../types'

import { ref, unref, watch } from 'vue'
import { formatTree } from 'easy-fns-ts'

import { useI18n } from '/@/locales'

export const useTableHeaders = (props: ComputedRef<WTableProps>) => {
  const { t, locale } = useI18n()

  const tableHeaders = ref<WTableHeaderItem[]>([])

  watch(
    () => [unref(props).headers, locale],
    ([val, _]: any) => {
      const formatted = formatTree(val, {
        format: (node) => ({
          ...node,
          visible: node.visible !== false,
          label:
            node.type === 'index'
              ? t('component.table.index')
              : node.type === 'action'
              ? t('component.table.operation')
              : node.type === 'selection'
              ? t('component.table.selection')
              : node.type === 'expand'
              ? t('component.table.expand')
              : node.label,
        }),
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
