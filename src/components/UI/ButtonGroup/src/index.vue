<script lang="tsx">
import type { WButtonGroupProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WButtonGroup',

  props,

  emits: [],

  setup(props: WButtonGroupProps, { attrs, slots, emit, expose }) {
    return () => (
      <n-button-group {...attrs}>
        {props.groups?.map(item => (
          <WButton {...item}></WButton>
        ))}
      </n-button-group>
    )
  },
})
</script>
