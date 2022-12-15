<script lang="tsx">
import type { WTimePickerProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WTimePicker',

  props,

  emits: [],

  setup(props: WTimePickerProps, { attrs, slots, emit, expose }) {
    return () => <n-time-picker></n-time-picker>
  },
})
</script>
