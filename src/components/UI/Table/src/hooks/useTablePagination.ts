import type { ComputedRef } from 'vue'
import type { WTable } from '../types'
import { unref, reactive, watch } from 'vue'

export const useTablePagination = (props: ComputedRef<WTable.Props>) => {
  const state = reactive<WTable.Params.PageState>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  watch(
    () => unref(props),
    (val: Exclude<WTable.Props, WTable.Params.PageState>) => {
      state.total = val.total!
      state.pageNum = val.pageNum!
      state.pageSize = val.pageSize!
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    pageState: state,
  }
}
