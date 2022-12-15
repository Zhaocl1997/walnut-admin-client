<script lang="tsx">
import type { WDatePickerProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WDatePicker',

  props,

  emits: [],

  setup(props: WDatePickerProps, { attrs, slots, emit, expose }) {
    return () => <n-date-picker></n-date-picker>
  },
})
</script>
