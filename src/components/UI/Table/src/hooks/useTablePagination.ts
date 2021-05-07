import type { ComputedRef } from 'vue'
import type { BasePaginationFields, WTableProps } from '../types'
import { unref, reactive, watch } from 'vue'

export const useTablePagination = (
  props: ComputedRef<WTableProps>,
  emit: Fn
) => {
  const state = reactive<BasePaginationFields>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  watch(
    () => unref(props),
    (val: Exclude<WTableProps, BasePaginationFields>) => {
      state.total = val.total!
      state.pageNum = val.pageNum!
      state.pageSize = val.pageSize!
    },
    {
      deep: true,
      immediate: true,
    }
  )

  const onPageChange = (val: BasePaginationFields) => {
    emit('page', val)
  }

  return {
    onPageChange,
    pageState: state,
  }
}
