import type { WTableEditableColumnHookProps } from '../type'

import { computed } from 'vue'

import { useLoading } from '/@/hooks/component/useLoading'
import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
import { wTableWarning } from '/@/components/UI/Table/src/utils'

export const useEditableColumnLoading = (
  props: WTableEditableColumnHookProps
) => {
  const { tableProps } = useTableContext()

  const { startLoading, endLoading } = useLoading()

  const loadingTargetId = computed(() => {
    if (!tableProps.value.rowKey) {
      wTableWarning(
        'Should provide `row-key` when use `editable` column! Otherwise, `loading` on edited cell will not work!'
      )
    }

    // handle nested prop
    return `w-${props.item?.prop.replaceAll('.', '')}-${
      props.row![tableProps.value.rowKey as string]
    }`
  })

  return {
    startLoading,
    endLoading,
    loadingTargetId,
  }
}
