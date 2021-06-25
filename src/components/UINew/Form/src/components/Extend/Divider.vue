<script lang="tsx">
  import type { PropType } from 'vue'
  import { defineComponent, ref } from 'vue'
  import { isUndefined } from 'easy-fns-ts'

  import WHelpTitle from '/@/components/Extra/HelpTitle'
  import WHelpArrow from '/@/components/Extra/HelpArrow'

  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormItemExtendDivider',

    components: { WHelpTitle, WHelpArrow },

    props: {
      title: String as PropType<string>,
      helpMessage: String as PropType<string>,
      prefix: String as PropType<string>,
      type: String as PropType<string>,
      foldable: Boolean as PropType<boolean>,
      startIndex: Number as PropType<number>,
      endIndex: Number as PropType<number>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      const active = ref(false)

      const { formSchemas } = useFormContext()

      const onToggle = () => {
        active.value = !active.value

        for (let i = props.startIndex!; i <= props.endIndex!; i++) {
          formSchemas![i]!.foldShow = !formSchemas![i]!.foldShow
        }
      }

      return () => (
        <n-divider>
          {props.title && (
            <>
              <w-help-title
                prefix={props.prefix}
                type={props.type}
                helpMessage={props.helpMessage}
              >
                {props.title}
              </w-help-title>

              {props.foldable && (
                <w-help-arrow
                  active={active.value}
                  class="mb-4"
                  onClick={onToggle}
                ></w-help-arrow>
              )}
            </>
          )}
        </n-divider>
      )
    },
  })
</script>
