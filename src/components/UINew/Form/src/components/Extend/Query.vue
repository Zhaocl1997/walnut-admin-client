<script lang="tsx">
  import type { PropType } from 'vue'

  import { defineComponent, ref, unref, computed } from 'vue'
  import { useI18n } from '/@/locales'
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormItemExtendQuery',

    props: {
      countToFold: Number as PropType<number>,
      foldable: Boolean as PropType<boolean>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      const { t } = useI18n()

      const loading = ref(false)

      const active = ref(false)

      const getText = computed(() =>
        active.value ? t('component.form.expand') : t('component.form.fold')
      )

      const { formEvent, formSchemas, setProps } = useFormContext()

      const onReset = () => {
        formEvent({ name: 'reset' })
      }

      const onQuery = () => {
        loading.value = true
        setProps({ disabled: true })
        formEvent({
          name: 'query',
          params: {
            done: () => {
              loading.value = false
              setProps({ disabled: false })
            },
          },
        })
      }

      const onToggle = () => {
        active.value = !active.value

        for (let i = props.countToFold!; i < formSchemas.value.length; i++) {
          formSchemas.value[i].foldShow = !formSchemas.value[i].foldShow
        }
      }

      return () => (
        <n-form-item>
          <n-space wrap={false} size="small">
            <n-button
              size="small"
              type="info"
              onClick={onReset}
              disabled={unref(loading)}
            >
              {t('component.form.reset')}
            </n-button>

            <n-button
              size="small"
              type="primary"
              onClick={onQuery}
              disabled={unref(loading)}
              loading={unref(loading)}
            >
              {{
                default: () => t('component.form.query'),
                icon: () => <w-icon icon="ant-design:search-outlined"></w-icon>,
              }}
            </n-button>

            {props.foldable && (
              <n-button
                size="small"
                type="default"
                icon-placement="right"
                onClick={onToggle}
                disabled={unref(loading)}
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
