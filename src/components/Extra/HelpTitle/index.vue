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
      const { helpMessage } = props

      return () => (
        <n-h3>
          {() => (
            <>
              {slots.default?.()}{' '}
              {helpMessage && (
                <w-help-message msg={helpMessage}></w-help-message>
              )}
            </>
          )}
        </n-h3>
      )
    },
  })
</script>
