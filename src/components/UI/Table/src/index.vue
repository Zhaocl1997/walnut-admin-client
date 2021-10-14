<script lang="tsx">
  import type { WTable } from '../src/types'

  import { useProps } from '/@/hooks/core/useProps'

  import { useTableEvents } from './hooks/useTableEvents'
  import { useTableColumns } from './hooks/useTableColumns'

  import { props } from './props'

  export default defineComponent({
    name: 'WTable',

    components: {},

    props,

    emits: ['hook'],

    setup(props: WTable.Props, ctx) {
      const { attrs, emit, expose, slots } = ctx

      const { setProps, getProps } = useProps<WTable.Props>(props)

      const { onEvent } = useTableEvents(getProps.value)

      const { columns } = useTableColumns(getProps)

      onEvent({
        name: 'hook',
        params: {
          setProps,
        },
      })

      return () => (
        <n-data-table
          {...unref(getProps)}
          columns={unref(columns)}
        ></n-data-table>
      )
    },
  })
</script>
