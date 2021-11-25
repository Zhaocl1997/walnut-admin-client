import type { SortState } from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'
import { isFunction, isUndefined } from 'easy-fns-ts'
import { useInitialState } from '/@/utils'

export const useTableAPI = (
  inst: Ref<WTable.Inst.NDataTableInst | undefined>,
  props: ComputedRef<WTable.Props>,
  setProps: WTable.SetProps
) => {
  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  const {
    stateRef: initParams,
    resetState: resetParams,
    setState: setParams,
  } = useInitialState<BaseListParams>({
    page: 1,
    pageSize: 10,
    sortField: 'createdAt',
    sortOrder: 'descend',
  })

  const checkedRowKeys = ref<StringOrNumber[]>([])

  // api list
  const onInit = async () => {
    console.log(1)

    setProps({ loading: true })

    const res = await props.value.apiProps?.listApi(initParams.value)!

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

  // api deleteMany (default)
  const onDeleteMany = async () => {
    const ret = await props.value.apiProps?.deleteManyApi(
      checkedRowKeys.value.join(',')
    )
    if (ret) {
      AppSuccess()
      await onInit()
      checkedRowKeys.value = []
    }
  }

  // query event
  const onQuery = async ({ done }: any) => {
    setParams({ page: 1 })
    await onInit()
    done()
  }

  // reset event
  const onReset = async ({ done }: any) => {
    resetParams()
    inst.value?.clearSorter()
    await onInit()
    done()
  }

  const onUpdatePage = async (p: number) => {
    setParams({ page: p })
    await onInit()
  }

  const onUpdatePageSize = async (p: number) => {
    setParams({ page: 1, pageSize: p })
    await onInit()
  }

  const onUpdateSorter = async (p: SortState) => {
    if (!p) return
    setParams({ sortField: p.columnKey, sortOrder: p.order })
    await onInit()
  }

  const onUpdateCheckedRowKeys = (rowKeys: StringOrNumber[]) => {
    checkedRowKeys.value = rowKeys
  }

  onMounted(() => {
    if (!isUndefined(props.value?.apiProps)) {
      if (isFunction(props?.value?.apiProps?.listApi)) {
        setProps({ remote: true })
        onInit()
      }

      if (
        props.value.columns?.map((i) => i.type).includes('selection') &&
        isFunction(props?.value?.apiProps?.deleteManyApi)
      ) {
        setProps({ onUpdateCheckedRowKeys })
      }

      // @ts-ignore
      if (props.value.columns?.map((i) => i.sorter === true).length !== 0) {
        setProps({ onUpdateSorter })
      }
    }
  })

  return {
    onInit,
    initParams,
    onQuery,
    onReset,
    onDeleteMany,
    checkedRowKeys,
  }
}
