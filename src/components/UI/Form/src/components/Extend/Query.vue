<script lang="tsx">
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormItemExtendQuery',

    props: {
      countToFold: Number as PropType<number>,
      foldable: Boolean as PropType<boolean>,
      defaultFold: Boolean as PropType<boolean>,
    },

    setup(props) {
      const { t } = useAppI18n()

      const active = ref(toRaw(props.defaultFold))

      const getText = computed(() =>
        active.value ? t('app:button:expand') : t('app:button:collapse')
      )

      const { formEvent, formSchemas, setProps, formProps } = useFormContext()

      const done = () => {
        setProps({ disabled: false })
      }

      const onFormReset = () => {
        setProps({ disabled: true })
        formEvent({
          name: 'reset',
          params: {
            done,
          },
        })
      }

      const onQuery = () => {
        setProps({ disabled: true })
        formEvent({
          name: 'query',
          params: {
            done,
          },
        })
      }

      const onToggle = () => {
        active.value = !active.value

        for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
          formSchemas.value[i]._internalShow =
            !formSchemas.value[i]._internalShow
        }
      }

      onMounted(() => {
        if (props.defaultFold) {
          for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
            formSchemas.value[i]._internalShow = false
          }
        }
      })

      return () => (
        <n-form-item>
          <n-space wrap={false} size="small">
            <n-button
              size="small"
              type="primary"
              onClick={onQuery}
              disabled={formProps.value.disabled}
              loading={formProps.value.disabled}
            >
              {{
                default: () => t('app:button:query'),
                icon: () => <w-icon icon="ant-design:search-outlined"></w-icon>,
              }}
            </n-button>

            <n-button
              size="small"
              type="info"
              onClick={onFormReset}
              disabled={formProps.value.disabled}
            >
              {t('app:button:reset')}
            </n-button>

            {props.foldable && (
              <n-button
                size="small"
                type="default"
                icon-placement="right"
                onClick={onToggle}
                disabled={formProps.value.disabled}
              >
                {{
                  default: () => unref(getText),
                  icon: () => (
                    <w-arrow active={!unref(active)} class="mt-0.5"></w-arrow>
                  ),
                }}
              </n-button>
            )}
          </n-space>
        </n-form-item>
      )
    },
  })
</script>
