import type { SortState } from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'
import { isUndefined } from 'easy-fns-ts'

export const useTableAPI = (
  props: ComputedRef<WTable.Props>,
  setProps: WTable.SetProps
) => {
  const { t } = useAppI18n()

  const initParams = ref<BaseListParams>({
    page: 1,
    pageSize: 10,
  })

  const onInit = async () => {
    if (isUndefined(props.value?.apiProps)) {
      return
    }

    setProps({ loading: true })

    const res = await props.value.apiProps?.api(initParams.value)!

    setProps({ data: res.data! })

    setProps({
      pagination: {
        itemCount: res.total!,
        page: initParams.value.page,
        pageSize: initParams.value.pageSize,
        showSizePicker: true,
        showQuickJumper: true,
        pageSizes: [10, 30, 50],
        pageSlot: 7,
        // temporary
        onChange: onUpdatePage,
        // TODO naive bug , trigger twice
        // onUpdatePage,
        onUpdatePageSize,
        prefix: () => t('comp:pagination:total', { total: res.total }),
      },
    })

    setProps({ loading: false })
  }

  const onUpdatePage = async (p: number) => {
    initParams.value.page = p
    await onInit()
  }

  const onUpdatePageSize = async (p: number) => {
    initParams.value.page = 1
    initParams.value.pageSize = p
    await onInit()
  }

  const onUpdateSorter = async (p: SortState) => {
    initParams.value.sortField = p.columnKey
    initParams.value.sortOrder = p.order
    await onInit()
  }

  onMounted(() => {
    if (!isUndefined(props.value?.apiProps)) {
      setProps({ remote: true })

      // @ts-ignore
      if (props.value.columns.map((i) => i.sorter).length !== 0) {
        setProps({ onUpdateSorter })
      }
    }

    onInit()
  })

  return {
    onInit,
    initParams,
  }
}
