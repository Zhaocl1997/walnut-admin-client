<script lang="tsx">
  import type { WButtonGroupProps } from './types'

  import { defineComponent } from 'vue'
  import { props } from './props'

  import WButtonNew from '../../Button'

  export default defineComponent({
    name: 'WButtonGroup',

    components: { WButtonNew },

    props,

    emits: [],

    setup(props: WButtonGroupProps, { attrs, slots, emit, expose }) {
      return () => (
        <n-button-group {...attrs}>
          {props.groups?.map((item) => (
            <w-button-new {...item}></w-button-new>
          ))}
        </n-button-group>
      )
    },
  })
</script>
