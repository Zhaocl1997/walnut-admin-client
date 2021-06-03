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

      const { formProps, formSchemas } = useFormContext()

      const active = ref(false)

      const getText = computed(() =>
        active.value ? t('component.form.expand') : t('component.form.fold')
      )

      const onQuery = () => {}

      const onReset = () => {}

      const onToggle = () => {
        active.value = !active.value

        const endIndex = formSchemas.value.length

        for (let i = 2; i < endIndex; i++) {
          formSchemas.value[i].foldShow = !getBoolean(
            formSchemas.value[i].foldShow
          )
        }
      }

      watch(
        () => formProps.value.span,
        () => {
          active.value = false
        }
      )

      const getStyle = computed(() => {
        return active.value &&
          24 - formProps.value.span! * formProps.value.countToFold! >= 6
          ? { marginTop: '-52px' }
          : {}
      })

      return () => {
        return (
          <div class="flex justify-end relative" style={getStyle.value}>
            <el-space size="mini">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-search"
                onClick={onQuery}
              >
                {t('component.form.query')}
              </el-button>

              <el-button size="small" type="info" onClick={onReset}>
                {t('component.form.reset')}
              </el-button>

              {formProps.value.foldable && (
                <w-button
                  size="small"
                  type="text"
                  onClick={onToggle}
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
      }
    },
  })
</script>
