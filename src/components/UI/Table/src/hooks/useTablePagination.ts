import type { SetupContext } from 'vue'
import type { WTableProps } from '../types'
import { unref, reactive, watch } from 'vue'

export const useTablePagination = (props: WTableProps, ctx: SetupContext) => {
  const { emit } = ctx

  const state = reactive({
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  watch(
    () => unref(props),
    (val: any) => {
      state.total = val.total
      state.pageNum = val.pageNum
      state.pageSize = val.pageSize
    },
    {
      deep: true,
      immediate: true,
    }
  )

  const onPageChange = (val: any) => {
    emit('page', val)
  }

  return {
    onPageChange,
    pageState: state,
  }
}
