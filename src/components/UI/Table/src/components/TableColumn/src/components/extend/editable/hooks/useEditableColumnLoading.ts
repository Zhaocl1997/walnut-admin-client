import type { ComputedRef } from 'vue'
import type { WTable } from '/@/components/UI/Table'

import { computed } from 'vue'

import { useLoading } from '/@/hooks/component/useLoading'
import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
import { wTableWarning } from '/@/components/UI/Table/src/utils'

export const useEditableColumnLoading = (
  props: SetupProp<{ row: Pick<WTable.ScopeSlotData, 'row'> }>,
  getProp: ComputedRef<string | undefined>
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
    return `w-${getProp.value?.replaceAll('.', '')}-${
      props.row![tableProps.value.rowKey as string]
    }`
  })

  const loadStart = () => startLoading({ target: `#${loadingTargetId.value}` })
  const loadEnd = () => endLoading()

  return {
    loadStart,
    loadEnd,
    loadingTargetId,
  }
}
