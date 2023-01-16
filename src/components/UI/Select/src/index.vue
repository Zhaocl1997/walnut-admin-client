<script lang="tsx">
import type { SelectOption } from 'naive-ui'

import { NTooltip } from 'naive-ui'
import type { WSelectProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WSelect',

  props,

  emits: [],

  setup(props: WSelectProps, { attrs, slots, emit, expose }: any) {
    const renderOption = ({
      node,
      option,
    }: {
      node: VNode
      option: SelectOption
    }) => {
      return h(NTooltip, { placement: 'right' }, {
        default: () =>
          attrs['render-label']
            ? attrs['render-label'](option)
            : <span>{option.label}</span>,
        trigger: () => node,
      })
    }

    return () => (
      <n-select
        render-option={props.tooltip ? renderOption : attrs['render-option']}
      >
        {{ action: () => slots.action && slots.action() }}
      </n-select>
    )
  },
})
</script>
