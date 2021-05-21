import type { WTable } from '../types'
import type { ComputedRef } from 'vue'

import { watch } from 'vue'
import { useLoading } from '/@/hooks/component/useLoading'

export const useTableLoading = (
  props: ComputedRef<WTable.Props>,
  id: string
) => {
  const { startLoading, endLoading } = useLoading({ target: `#${id}` })

  watch(
    () => props.value.loading,
    (val) => {
      val ? startLoading() : endLoading()
    }
  )
}
