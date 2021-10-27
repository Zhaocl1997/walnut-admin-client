<script lang="tsx">
  import { isUndefined } from 'easy-fns-ts'
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormItemExtendDivider',

    props: {
      title: String as PropType<string>,
      helpMessage: String as PropType<string>,
      prefix: String as PropType<string>,
      type: String as PropType<string>,
      foldable: Boolean as PropType<boolean>,
      startIndex: {
        type: Number as PropType<number>,
        default: 0,
      },
      endIndex: Number as PropType<number>,
      index: Number as PropType<number>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      const active = ref(false)

      const { formSchemas } = useFormContext()

      const onToggle = () => {
        active.value = !active.value

        for (
          let i = props.index! + props.startIndex! + 1;
          i <= props.index! + (props.endIndex! ?? formSchemas.value.length);
          i++
        ) {
          if (!isUndefined(formSchemas.value[i]?.foldShow)) {
            formSchemas.value[i]!.foldShow = !formSchemas.value[i]?.foldShow
          }
        }
      }

      return () =>
        props.title ? (
          <n-divider class="my-1">
            {props.title && (
              <>
                <w-title
                  prefix={props.prefix}
                  type={props.type}
                  helpMessage={props.helpMessage}
                >
                  {props.title}
                </w-title>

                {props.foldable && (
                  <w-arrow
                    active={!active.value}
                    class="mb-4"
                    onClick={onToggle}
                  ></w-arrow>
                )}
              </>
            )}
          </n-divider>
        ) : (
          <n-divider></n-divider>
        )
    },
  })
</script>

<style scoped>
  .n-divider {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
</style>
