<script lang="tsx">
import type { WDynamicTagsProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WDynamicTags',

  props,

  emits: [],

  setup(props: WDynamicTagsProps, { attrs, slots, emit, expose }) {
    return () => <n-dynamic-tags></n-dynamic-tags>
  },
})
</script>
