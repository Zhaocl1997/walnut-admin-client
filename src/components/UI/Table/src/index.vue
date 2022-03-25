<script lang="tsx">
  import type { WTable } from '../src/types'

  import { omit } from 'lodash-es'

  import { useProps } from '/@/hooks/core/useProps'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableEvents } from './hooks/useTableEvents'
  import { useTableColumns } from './hooks/useTableColumns'
  import { useTableAPI } from './hooks/useTableAPI'

  import { props, extendProps } from './props'

  import HeaderActions from './components/actions.vue'
  import QueryForm from './components/queryForm.vue'
  import Utils from './components/utils.vue'

  export default defineComponent({
    name: 'WTable',

    inheritAttrs: false,

    // @ts-ignore
    props,

    emits: ['hook', 'tableHeaderActions'],

    setup(props: WTable.Props) {
      const tableRef = ref<WTable.Inst.NDataTableInst>()

      const { setProps, getProps } = useProps<WTable.Props>(props)

      const { onEvent } = useTableEvents(getProps)

      const {
        onApiTableList,
        ApiTableListParams,
        onApiTableQuery,
        onApiTableReset,
        onApiTableDelete,
        onApiTableDeleteMany,
        checkedRowKeys,
      } = useTableAPI(tableRef, getProps, setProps)

      const { columns } = useTableColumns(
        getProps,
        ApiTableListParams,
        setProps
      )

      const getNDataTableProps = computed(() =>
        omit(getProps.value, Object.keys(extendProps))
      )

      const render = () => (
        <>
          {getProps.value.queryFormProps && (
            <n-card class="mb-1">
              <QueryForm />
            </n-card>
          )}

          <n-card>
            <div class="mb-2 flex justify-between items-center">
              <HeaderActions />
              <Utils />
            </div>

            <n-data-table
              ref={tableRef}
              {...getNDataTableProps.value}
              columns={columns.value}
            ></n-data-table>
          </n-card>
        </>
      )

      onEvent({
        name: 'hook',
        params: {
          setProps,
          onApiTableList,
          onApiTableDelete,
          onApiTableDeleteMany,
          onGetApiTableListParams: () => ApiTableListParams,
        },
      })

      setTableContext({
        tableRef,
        onEvent,
        tableProps: getProps,
        onApiTableList,
        ApiTableListParams,
        onApiTableQuery,
        onApiTableReset,
        checkedRowKeys,
        tableColumns: columns,
      })

      return () => render()
    },
  })
</script>
