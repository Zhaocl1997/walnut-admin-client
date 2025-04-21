import type {
  SorterMultiple,
  SortState,
  TableBaseColumn,
} from 'naive-ui/lib/data-table/src/interface'
import type { WTable } from '../types'
import { isFunction, isNumber, isUndefined } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'

import { extractDefaultFormDataFromSchemas } from '../../../Form/src/utils'
import {
  generateBaseListParams,
  generateDefaultSortParams,
  generateSortParams,
} from '../utils'

export function useTableAPI(inst: Ref<WTable.Inst.NDataTableInst | undefined>, props: ComputedRef<WTable.Props>, setProps: WTable.SetProps) {
  const { t } = useAppI18n()
  const userPermission = useAppStoreUserPermission()

  const {
    stateRef: ApiTableListParams,
    resetState: resetParams,
    commit: commitParams,
  } = useState<WalnutBaseListParams>({
    query: {},
    sort: [],
    page: {
      page: 1,
      pageSize: 10,
    },
  })

  const total = ref(0)

  const checkedRowKeys = ref<StringOrNumber[]>([])

  // api list
  const onApiTableList = async () => {
    // no list auth, return
    if (!userPermission.hasPermission(props.value.auths?.list)) {
      useAppNotiError(t('sys.msg.noAuthority'))
      return
    }

    // start table loading
    setProps({ loading: true })

    // used for format sort params, query and page didn't change
    const params = generateBaseListParams(ApiTableListParams.value)

    if (params.sort?.length === 0) {
      params.sort = generateSortParams(
        generateDefaultSortParams(props.value.columns!),
      )
    }

    // is got `onBeforeRequest`, then excute it and set query value
    if (isFunction(props?.value?.apiProps?.onBeforeRequest!)) {
      params.query = props?.value?.apiProps?.onBeforeRequest!(
        cloneDeep(params.query),
      )
    }

    try {
      const res = await props.value.apiProps?.listApi!(params)!

      total.value = res.total

      setProps({
        data: res.data,
        pagination: {
          itemCount: res.total,
          page: ApiTableListParams.value.page?.page,
          pageSize: ApiTableListParams.value.page?.pageSize,
          showSizePicker: true,
          showQuickJumper: true,
          pageSizes: [10, 30, 50],
          pageSlot: 7,
          onUpdatePage: async (p) => {
            ApiTableListParams.value.page!.page = p
            await onApiTableList()
          },
          onUpdatePageSize: async (p) => {
            ApiTableListParams.value.page!.page = 1
            ApiTableListParams.value.page!.pageSize = p
            await onApiTableList()
          },
          prefix: () => t('comp.pagination.total', { total: res.total }),
        },
      })
    }
    finally {
      setProps({ loading: false })
    }
  }

  // api delete (default)
  const onApiTableDelete = async (id: StringOrNumber) => {
    const ret = await props.value.apiProps?.deleteApi!(id)
    if (ret) {
      useAppMsgSuccess()
      await onApiTableList()
    }
  }

  // api deleteMany (default)
  const onApiTableDeleteMany = async () => {
    const ret = await props.value.apiProps?.deleteManyApi!(
      checkedRowKeys.value.join(','),
    )

    if (ret) {
      useAppMsgSuccess()

      if (
        ApiTableListParams.value.page!.page!
        * ApiTableListParams.value.page!.pageSize!
        > total.value - checkedRowKeys.value.length
      ) {
        ApiTableListParams.value.page!.page = 1
      }

      await onApiTableList()

      // use `length = 0` can clear the arr
      checkedRowKeys.value.length = 0
    }
  }

  // query event
  const onApiTableQuery: WTable.FinishLoadingCallback = async ({ done }) => {
    ApiTableListParams.value.page!.page = 1
    await onApiTableList()
    done()
  }

  // reset event
  const onApiTableReset: WTable.FinishLoadingCallback = async ({ done }) => {
    resetParams()
    inst.value?.clearSorter()
    inst.value?.clearFilters()
    await onApiTableList()
    done()
  }

  const handleListApi = async () => {
    if (!isFunction(props?.value?.apiProps?.listApi))
      return

    // set remote true to fit naive-ui
    setProps({ remote: true })

    if (
      !isUndefined(props.value.queryFormProps)
      && !isUndefined(props.value.queryFormProps?.schemas!)
    ) {
      // need to initial query form data based on schemas
      const defaultQueryFormData = extractDefaultFormDataFromSchemas(
        props.value.queryFormProps?.schemas!,
      )

      // set default value to query
      ApiTableListParams.value.query = cloneDeep(defaultQueryFormData)

      // commit change, make this version a default version
      commitParams()
    }

    if (
      props.value.columns!.some(
        i => (i as TableBaseColumn).defaultSortOrder,
      )
    ) {
      // @ts-expect-error
      // TODO sort two types
      ApiTableListParams.value.sort = generateDefaultSortParams(
        props.value.columns!,
      )

      // commit change, make this version a default version
      commitParams()
    }

    await onApiTableList()
  }

  const handleSelectionColumn = () => {
    if (
      props.value.columns?.map(i => i.type).includes('selection')
      && isFunction(props?.value?.apiProps?.deleteManyApi!)
    ) {
      setProps({
        onUpdateCheckedRowKeys: (rowKeys: StringOrNumber[]) => {
          checkedRowKeys.value = rowKeys
        },
      })
    }
  }

  const handleSortParams = () => {
    if (
      props.value.columns
        ?.map(
          i =>
            (i as unknown as SortState).sorter === true
            || isNumber(
              ((i as unknown as SortState).sorter as SorterMultiple)?.multiple,
            ),
        )
        .filter(Boolean)
        .length !== 0
    ) {
      setProps({
        onUpdateSorter: async (p) => {
          if (!p)
            return
          ApiTableListParams.value.sort = p
          await onApiTableList()
        },
      })
    }
  }

  const handleDictFilter = () => {
    if (props.value.columns?.some(i => i.filter === true)) {
      setProps({
        onUpdateFilters: async (filters) => {
          ApiTableListParams.value.query = Object.assign(
            ApiTableListParams.value.query,
            filters,
          )

          await onApiTableList()
        },
      })
    }
  }

  onMounted(async () => {
    if (!isUndefined(props.value?.apiProps)) {
      // Step 1
      // handle initial query form data
      await handleListApi()

      // Step 2
      // handle sort params and event
      handleSortParams()

      // Step 3
      // handle selection column to manage checkedRowKeys
      handleSelectionColumn()

      // Step 4
      // handle preset dict column filter event
      handleDictFilter()
    }
  })

  return {
    onApiTableList,
    ApiTableListParams,
    onApiTableQuery,
    onApiTableReset,
    onApiTableDelete,
    onApiTableDeleteMany,
    checkedRowKeys,
  }
}
