<script lang="tsx">
  import type { PropType } from 'vue'

  import { defineComponent, ref, unref, computed } from 'vue'
  import { useI18n } from '/@/locales'
  import WHelpArrow from '/@/components/Extra/HelpArrow'
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormItemExtendQuery',

    components: { WHelpArrow },

    props: {
      countToFold: Number as PropType<number>,
    },

    setup(props, { attrs, slots, emit, expose }) {
      const { t } = useI18n()

      const loading = ref(false)

      const active = ref(false)

      const getText = computed(() =>
        active.value ? t('component.form.expand') : t('component.form.fold')
      )

      const { formEvent, formSchemas } = useFormContext()

      const onReset = () => {
        formEvent({ name: 'reset', params: 'asd' })
      }

      const onQuery = () => {
        loading.value = true
        formEvent({
          name: 'query',
          params: {
            done: () => {
              loading.value = false
            },
          },
        })
      }

      const onToggle = () => {
        active.value = !active.value

        for (let i = props.countToFold!; i < formSchemas.length; i++) {
          formSchemas[i].foldShow = !formSchemas[i].foldShow
        }
      }

      return () => (
        <div class="flex flex-row flex-nowrap space-x-2">
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
            {t('component.form.query')}
          </n-button>

          <n-button
            size="small"
            type="default"
            icon-placement="right"
            onClick={onToggle}
          >
            {{
              default: () => unref(getText),
              icon: () => (
                <w-help-arrow
                  active={!unref(active)}
                  class="mt-0.5"
                ></w-help-arrow>
              ),
            }}
          </n-button>
        </div>
      )
    },
  })
</script>
