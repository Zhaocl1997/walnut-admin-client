<script lang="tsx">
  import type { WTable } from '../src/types'

  import { defineComponent, unref } from 'vue'

  import { useProps } from '/@/hooks/core/useProps'

  import { props } from './props'

  import { useTableEvents } from './hooks/useTableEvents'

  export default defineComponent({
    name: 'WTable',

    components: {},

    props,

    emits: ['hook'],

    setup(props: WTable.Props, ctx) {
      const { setProps, getProps } = useProps<WTable.Props>(props)

      const { onEvent } = useTableEvents(getProps.value)

      onEvent({
        name: 'hook',
        params: {
          setProps,
        },
      })

      return () => <n-data-table {...unref(getProps)} />
    },
  })
</script>
