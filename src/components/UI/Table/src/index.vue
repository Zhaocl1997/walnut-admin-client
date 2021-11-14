<script lang="tsx">
  import type { WTable } from '../src/types'

  import { useProps } from '/@/hooks/core/useProps'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableEvents } from './hooks/useTableEvents'
  import { useTableColumns } from './hooks/useTableColumns'

  import { props } from './props'

  import HeaderActions from './components/actions.vue'

  export default defineComponent({
    name: 'WTable',

    components: { HeaderActions },

    props,

    emits: ['hook', 'action'],

    // @ts-ignore
    setup(props: WTable.Props, { attrs, emit, expose, slots }) {
      const { setProps, getProps } = useProps<WTable.Props>(props)

      const { onEvent } = useTableEvents(getProps)

      const { columns } = useTableColumns(getProps)

      const renderNDataTable = () => (
        <>
          <div class="mb-2">
            <HeaderActions />
          </div>

          <n-data-table
            {...unref(getProps)}
            columns={unref(columns)}
          ></n-data-table>
        </>
      )

      onEvent({
        name: 'hook',
        params: {
          setProps,
        },
      })

      setTableContext({
        onEvent,
        tableProps: getProps,
      })

      return () => renderNDataTable()
    },
  })
</script>
