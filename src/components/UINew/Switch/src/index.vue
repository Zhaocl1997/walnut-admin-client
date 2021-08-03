<script lang="tsx">
  import type { WSwitchProps } from './types'

  import { defineComponent } from 'vue'
  import { props } from './props'

  export default defineComponent({
    name: 'WSwitch',

    props,

    emits: [],

    setup(props: WSwitchProps, { attrs, slots, emit, expose }) {
      return () => (
        <n-switch>
          {{
            checked: () => attrs.checkedText,
            unchecked: () => attrs.uncheckedText,
          }}
        </n-switch>
      )
    },
  })
</script>
