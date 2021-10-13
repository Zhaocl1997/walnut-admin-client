<script lang="tsx">
  import type { WSelectProps } from './types'

  import { defineComponent } from 'vue'
  import { props } from './props'

  export default defineComponent({
    name: 'WSelect',

    props,

    emits: [],

    setup(props: WSelectProps, { attrs, slots, emit, expose }) {
      return () => <n-select></n-select>
    },
  })
</script>
