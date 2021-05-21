import type { WTable } from '../types'

import { ComputedRef, ref, watchEffect } from 'vue'
import { formatTree } from 'easy-fns-ts'

import { useI18n } from '/@/locales'
import { wTableWarning } from '../utils'

/**
 * @description
 * Since props has been proxyed
 * So to prevent props like `stripe`/`border` which are not relatived to header from triggering table rerender again
 * This hook only use normal props, but not proxyed one
 */
export const useTableHeaders = (
  props: WTable.Props,
  getProps: ComputedRef<WTable.Props>
) => {
  const { t } = useI18n()

  const tableHeaders = ref<WTable.Header.Item.Props[]>([])

  watchEffect(() => {
    const formatted = formatTree(
      props.headers ? props.headers! : getProps.value.headers!,
      {
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
      }
    )

    wTableWarning('Rendered!')

    tableHeaders.value = formatted
  })

  return {
    tableHeaders,
  }
}
