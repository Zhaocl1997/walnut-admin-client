<script lang="tsx">
  export default defineComponent({
    name: 'WTitle',

    props: {
      helpMessage: String as PropType<string>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      return () => (
        <n-h4 class="m-0 hstack items-center mb-1">
          {() => (
            <>
              {slots.default?.()}{' '}
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
