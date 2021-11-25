<script lang="tsx">
  import type { WTable } from '../src/types'

  import { easyOmit } from 'easy-fns-ts'

  import { useProps } from '/@/hooks/core/useProps'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableEvents } from './hooks/useTableEvents'
  import { useTableColumns } from './hooks/useTableColumns'
  import { useTableAPI } from './hooks/useTableAPI'

  import { props, extendProps } from './props'

  import HeaderActions from './components/actions.vue'
  import QueryForm from './components/queryForm.vue'

  export default defineComponent({
    name: 'WTable',

    inheritAttrs: false,

    // @ts-ignore
    props,

    emits: ['hook', 'action'],

    setup(props: WTable.Props, { attrs, emit, expose, slots }) {
      const tableRef = ref<WTable.Inst.NDataTableInst>()

      const { setProps, getProps } = useProps<WTable.Props>(props)

      const { onEvent } = useTableEvents(getProps)

      const { columns } = useTableColumns(getProps)

      const {
        onInit,
        initParams,
        onQuery,
        onReset,
        onDeleteMany,
        checkedRowKeys,
      } = useTableAPI(tableRef, getProps, setProps)

      const getNDataTableProps = computed(() =>
        easyOmit(getProps.value, Object.keys(extendProps))
      )

      const render = () => (
        <>
          <QueryForm />

          <div class="mb-2">
            <HeaderActions />
          </div>

          <n-data-table
            ref={tableRef}
            {...getNDataTableProps.value}
            columns={columns.value}
          ></n-data-table>
        </>
      )

      onEvent({
        name: 'hook',
        params: {
          setProps,
          onInit,
          onDeleteMany,
        },
      })

      setTableContext({
        tableRef,
        onEvent,
        tableProps: getProps,
        onInit,
        initParams,
        onQuery,
        onReset,
        checkedRowKeys,
      })

      return () => render()
    },
  })
</script>
