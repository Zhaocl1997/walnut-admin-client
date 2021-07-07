<script lang="tsx">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  import WHelpMessage from '../HelpMessage'

  export default defineComponent({
    name: 'WHelpTitle',

    components: { WHelpMessage },

    props: {
      helpMessage: String as PropType<string>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      return () => (
        <n-h4>
          {() => (
            <>
              {slots.default?.()}{' '}
              {props.helpMessage && (
                <w-help-message msg={props.helpMessage}></w-help-message>
              )}
            </>
          )}
        </n-h4>
      )
    },
  })
</script>
