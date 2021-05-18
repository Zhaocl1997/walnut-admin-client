import type { ComputedRef } from 'vue'
import type { WTable } from '../types'
import { unref, reactive, watch } from 'vue'

export const useTablePagination = (
  props: ComputedRef<WTable.Props>,
  emit: Fn
) => {
  const state = reactive<WTable.PaginationFields>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  watch(
    () => unref(props),
    (val: Exclude<WTable.Props, WTable.PaginationFields>) => {
      state.total = val.total!
      state.pageNum = val.pageNum!
      state.pageSize = val.pageSize!
    },
    {
      deep: true,
      immediate: true,
    }
  )

  const onPageChange = (val: WTable.PaginationFields) => {
    emit('page', val)
  }

  return {
    onPageChange,
    pageState: state,
  }
}
