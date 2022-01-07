import type {
  SorterMultiple,
  SortState,
} from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'

import { easyDeepClone, isFunction, isNumber, isUndefined } from 'easy-fns-ts'
import { generateBaseListParams } from '../utils'

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
    commit: commitParams,
  } = useState<BaseListParams>({
    query: {},
    sort: [],
    page: {
      page: 1,
      pageSize: 10,
    },
  })

  const checkedRowKeys = ref<StringOrNumber[]>([])

  // api list
  const onInit = async () => {
    setProps({ loading: true })

    const params = generateBaseListParams(initParams.value)

    // custom query
    if (isFunction(props?.value?.apiProps?.onBeforeRequest!)) {
      params.query = props?.value?.apiProps?.onBeforeRequest!(
        easyDeepClone(params.query)
      )
    }

    try {
      const res = await props.value.apiProps?.listApi!(params)!

      setProps({ data: res.data! })

      setProps({
        pagination: {
          itemCount: res.total!,
          page: initParams.value.page?.page,
          pageSize: initParams.value.page?.pageSize,
          showSizePicker: true,
          showQuickJumper: true,
          pageSizes: [10, 30, 50],
          pageSlot: 7,
          onUpdatePage,
          // TODO https://github.com/TuSimple/naive-ui/issues/1774
          // onUpdatePageSize,
          onPageSizeChange: onUpdatePageSize,
          prefix: () => t('comp:pagination:total', { total: res.total }),
        },
      })

      setProps({ loading: false })
    } finally {
      setProps({ loading: false })
    }
  }

  // api delete (default)
  const onDelete = async (id: StringOrNumber) => {
    const ret = await props.value.apiProps?.deleteApi!(id)
    if (ret) {
      AppSuccess()
      await onInit()
    }
  }

  // api deleteMany (default)
  const onDeleteMany = async () => {
    const ret = await props.value.apiProps?.deleteManyApi!(
      checkedRowKeys.value.join(',')
    )

    if (ret) {
      // use `length = 0` can clear the arr
      checkedRowKeys.value.length = 0
      AppSuccess()
      await onInit()
    }
  }

  // query event
  const onQuery = async ({ done }: any) => {
    initParams.value.page!.page = 1
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
    initParams.value.page!.page = p
    await onInit()
  }

  const onUpdatePageSize = async (p: number) => {
    initParams.value.page!.page = 1
    initParams.value.page!.pageSize = p
    await onInit()
  }

  const onUpdateSorter = async (p: SortState & SortState[] & null) => {
    if (!p) return
    initParams.value.sort = p
    await onInit()
  }

  const onUpdateCheckedRowKeys = (rowKeys: StringOrNumber[]) => {
    checkedRowKeys.value = rowKeys
  }

  onMounted(() => {
    if (!isUndefined(props.value?.apiProps)) {
      if (isFunction(props?.value?.apiProps?.listApi)) {
        const defaultFormData = Object.fromEntries(
          props.value.queryFormProps?.schemas
            ?.map<[string, null]>((i) => [i?.formProp?.path!, null])
            .filter((i) => i[0])!
        )

        initParams.value.query = easyDeepClone(defaultFormData)
        commitParams()

        setProps({ remote: true })
        onInit()
      }

      if (
        props.value.columns?.map((i) => i.type).includes('selection') &&
        isFunction(props?.value?.apiProps?.deleteManyApi!)
      ) {
        setProps({ onUpdateCheckedRowKeys })
      }

      if (
        props.value.columns
          ?.map(
            (i) =>
              (i as unknown as SortState).sorter === true ||
              isNumber(
                ((i as unknown as SortState).sorter as SorterMultiple)?.multiple
              )
          )
          .filter(Boolean).length !== 0
      ) {
        setProps({ onUpdateSorter })
      }
    }
  })

  return {
    onInit,
    initParams,
    onQuery,
    onReset,
    onDelete,
    onDeleteMany,
    checkedRowKeys,
  }
}
