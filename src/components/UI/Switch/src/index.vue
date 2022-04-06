<script lang="tsx">
  import type { WSwitchProps } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WSwitch',

    props,

    emits: [],

    setup(props: WSwitchProps, { attrs, slots, emit, expose }) {
      return () => (
        <n-switch>
          {{
            checked: () => props.checkedText,
            unchecked: () => props.uncheckedText,
          }}
        </n-switch>
      )
    },
  })
</script>
