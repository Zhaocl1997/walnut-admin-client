<script lang="tsx">
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useFormContext } from '../../hooks/useFormContext'
  import { getBoolean } from '../../utils'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'WFormExtendQuery',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()

      const { formProps, formSchemas, formEvent, formRef } = useFormContext()

      const active = ref(false)

      const getText = computed(() =>
        active.value ? t('component.form.expand') : t('component.form.fold')
      )

      const onQuery = () => {
        formEvent({ name: 'query' })
      }

      const onReset = () => {
        formEvent({ name: 'reset' })

        formRef.value?.resetFields()
      }

      const onToggle = (val?: number) => {
        !val && (active.value = !active.value)

        const len = formSchemas.value.length

        for (let i = formProps.value.countToFold!; i < len; i++) {
          formSchemas.value[i].foldShow = !getBoolean(
            formSchemas.value[i].foldShow
          )
        }
      }

      watch(
        () => formProps.value.countToFold,
        (val) => {
          if (formProps.value.foldable) {
            const len = formSchemas.value.length

            for (let i = 0; i < len; i++) {
              formSchemas.value[i].foldShow = true
            }

            if (val === len) {
              active.value = false
              return
            }

            onToggle(1)
          }
        }
      )

      const getStyle = computed(() =>
        active.value &&
        24 - formProps.value.span! * formProps.value.countToFold! >= 6
          ? { marginTop: '-52px' }
          : {}
      )

      return () => (
        <div
          class="flex justify-end relative float-right"
          style={getStyle.value}
        >
          <el-space size="mini">
            <el-button
              size="small"
              type="info"
              onClick={onReset}
              disabled={formProps.value.loading}
            >
              {t('component.form.reset')}
            </el-button>

            <el-button
              size="small"
              type="primary"
              icon="el-icon-search"
              onClick={onQuery}
              loading={formProps.value.loading}
            >
              {t('component.form.query')}
            </el-button>

            {formProps.value.foldable && (
              <w-button
                size="small"
                type="text"
                onClick={() => onToggle(0)}
                text={getText.value}
              >
                {{
                  suffix: () => (
                    <w-arrow
                      active={!active.value}
                      style={{ height: '16px' }}
                    ></w-arrow>
                  ),
                }}
              </w-button>
            )}
          </el-space>
        </div>
      )
    },
  })
</script>
