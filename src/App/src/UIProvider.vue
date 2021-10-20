<script lang="tsx">
  import type { GlobalThemeOverrides } from 'naive-ui'
  import { darkTheme } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

  export default defineComponent({
    name: 'UIProvider',

    setup(_, { slots }) {
      const { app } = useAppContext()

      const getTheme = computed(() =>
        !app.value.isDark ? undefined : darkTheme
      )
      const getThemeOverrides = computed(
        (): GlobalThemeOverrides =>
          !app.value.isDark
            ? // light
              {
                common: {
                  baseColor: 'rgb(250, 250 ,250)',
                  bodyColor: 'rgb(234, 234, 234)',
                  invertedColor: 'rgb(0, 16, 32)',
                },
              }
            : // dark
              {
                common: {
                  baseColor: 'rgb(16, 16, 16)',
                  bodyColor: 'rgb(32, 32, 32)',
                  invertedColor: 'rgb(20, 20, 20)',
                },
              }
      )

      return () => (
        <n-config-provider
          theme={getTheme.value}
          theme-overrides={getThemeOverrides.value}
          locale={app.value.locale === 'en' ? {} : zhCN}
          date-locale={app.value.locale === 'en' ? {} : dateZhCN}
        >
          <n-loading-bar-provider>
            <n-dialog-provider>
              <n-notification-provider>
                <n-message-provider>
                  {() => slots.default?.()}
                </n-message-provider>
              </n-notification-provider>
            </n-dialog-provider>
          </n-loading-bar-provider>
        </n-config-provider>
      )
    },
  })
</script>
