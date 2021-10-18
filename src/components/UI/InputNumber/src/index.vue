<script lang="tsx">
  import type { WInputNumberProps } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WInputNumber',

    props,

    emits: [],

    setup(props: WInputNumberProps, { attrs, slots, emit, expose }) {
      return () => <n-input-number class="w-full"></n-input-number>
    },
  })
</script>
