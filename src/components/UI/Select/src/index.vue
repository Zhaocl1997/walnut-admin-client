<script lang="tsx">
  import type { WSelectProps } from './types'

  import type { SelectOption } from 'naive-ui'

  import { NTooltip } from 'naive-ui'

  import { props } from './props'

  export default defineComponent({
    name: 'WSelect',

    props,

    emits: [],

    setup(props: WSelectProps, { attrs, slots, emit, expose }) {
      const renderOption = ({
        node,
        option,
      }: {
        node: VNode
        option: SelectOption
      }) => {
        return h(NTooltip, null, {
          default: () => option.label,
          trigger: () => node,
        })
      }

      return () => (
        <n-select
          render-option={props.tooltip ? renderOption : null}
        ></n-select>
      )
    },
  })
</script>
