<script lang="tsx">
import type { WInputNumberProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WInputNumber',

  props,

  emits: [],

  setup(props: WInputNumberProps, { attrs, slots, emit, expose }) {
    return () => (
        <n-input-number>{{ suffix: () => props.suffix }}</n-input-number>
    )
  },
})
</script>
