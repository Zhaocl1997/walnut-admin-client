<script lang="tsx">
import type { WCheckboxProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WCheckbox',

  props,

  emits: [],

  setup(props: WCheckboxProps, { attrs, slots, emit, expose }) {
    return () => (
        <n-checkbox-group>
          <n-space>
            {props.options!.map(item => (
              <n-checkbox key={item.value} {...item}></n-checkbox>
            ))}
          </n-space>
        </n-checkbox-group>
    )
  },
})
</script>
