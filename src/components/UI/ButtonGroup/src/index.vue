<script lang="tsx">
  import type { WButtonGroupProps } from './types'

  import { defineComponent } from 'vue'
  import { props } from './props'

  export default defineComponent({
    name: 'WButtonGroup',

    props,

    emits: [],

    setup(props: WButtonGroupProps, { attrs, slots, emit, expose }) {
      return () => (
        <n-button-group {...attrs}>
          {props.groups?.map((item) => (
            <w-button {...item}></w-button>
          ))}
        </n-button-group>
      )
    },
  })
</script>
