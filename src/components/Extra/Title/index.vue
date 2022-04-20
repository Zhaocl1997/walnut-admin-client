<script lang="tsx">
  export default defineComponent({
    name: 'WTitle',

    props: {
      helpMessage: [String, Array] as PropType<string | string[]>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      return () => (
        <n-h4 class="m-0 hstack items-center mb-1">
          {() => (
            <>
              <span class="mr-1">{slots.default?.()}</span>
              {props.helpMessage && (
                <w-message msg={props.helpMessage}></w-message>
              )}
            </>
          )}
        </n-h4>
      )
    },
  })
</script>
