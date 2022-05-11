<script lang="tsx">
  export default defineComponent({
    name: 'WMessage',

    props: {
      msg: [String, Array] as PropType<string | string[]>,

      icon: {
        type: String as PropType<string>,
        default: 'ant-design:info-circle-filled',
      },
    },

    setup(props, { attrs, slots, emit, expose }) {
      const formatMessage = () =>
        typeof props.msg === 'string'
          ? props.msg.includes('\\n')
            ? props.msg.split('\\n').map((i) => <div>{i}</div>)
            : props.msg
          : props.msg?.map((i) => <div>{i}</div>)

      return () => (
        <div>
          <n-tooltip>
            {{
              default: () => formatMessage(),
              trigger: () => (
                <w-icon
                  icon={props.icon}
                  width="16"
                  class="align-middle inline mb-0.5"
                ></w-icon>
              ),
            }}
          </n-tooltip>
        </div>
      )
    },
  })
</script>
