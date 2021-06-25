<script lang="tsx">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WHelpMessage',

    props: {
      msg: [String, Array] as PropType<string | string[]>,

      icon: {
        type: String as PropType<string>,
        default: 'ant-design:info-circle-filled',
      },
    },

    setup(props, { attrs, slots, emit, expose }) {
      const { icon, msg } = props

      const formatMessage = () =>
        typeof msg === 'string'
          ? msg!.includes(' \n ')
            ? msg!.split(' \n ').map((i) => <div>{i}</div>)
            : msg
          : msg!.map((i) => <div>{i}</div>)

      return () => (
        <n-tooltip>
          {{
            default: () => formatMessage(),
            trigger: () => (
              <w-icon icon={icon} width="16" class="align-middle"></w-icon>
            ),
          }}
        </n-tooltip>
      )
    },
  })
</script>
